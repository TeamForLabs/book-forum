import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { IBookResponse } from 'src/app/shared/interfaces/book.interface';
import { ICommentRequest } from 'src/app/shared/interfaces/comment.interface';
import { IUserData } from 'src/app/shared/interfaces/user-data.interface';
import { BooksService } from 'src/app/shared/services/books/books.service';
import { CommentsService } from 'src/app/shared/services/comments/comments.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-books-details',
  templateUrl: './books-details.component.html',
  styleUrls: ['./books-details.component.scss']
})
export class BooksDetailsComponent implements OnInit, OnDestroy {

  @ViewChild('commentsStart') commentsStart!: ElementRef;

  public book!: IBookResponse;
  public commentForm!: FormGroup
  public readyToComment = false;
  public userData!: IUserData;
  public isLoggedIn = false;
  public bookId!: number;
  public commentCount!: number;

  private eventsSubscription!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private booksService: BooksService,
    private fb: FormBuilder,
    private commentsService: CommentsService,
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.eventsSubscription = this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        this.loadBook();
      }
    })
    this.isLoggedIn = Boolean(localStorage.getItem('bookForumToken'));
    this.initCommentForm();
    this.loadBook();
    this.auth.authAction.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn as boolean;
    })
  }

  ngOnDestroy(): void {
    this.eventsSubscription.unsubscribe()
  }

  loadBook(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.booksService.getOne(id).subscribe(data => {
      console.log(data);
      this.book = data;
      this.commentCount = this.book.comments.length >= 10 ? 10 : this.book.comments.length;
    }, err => {
      console.log(`Could not get the book (id: ${id})`, err);
    });
  }

  initCommentForm(): void {
    this.commentForm = this.fb.group({
      commenter: [null, this.isLoggedIn ? null : Validators.required],
      comment: [null, Validators.required]
    })
  }

  postComment(): void {
    this.getUserData();
    let comment: ICommentRequest = {
      username: this.commentForm.value.commenter,
      text: this.commentForm.value.comment,
      created_at: String(Date.now()),
    }
    this.commentsService.create(comment, this.book.id, this.userData.token).subscribe(() => {
      this.loadBook();
      this.readyToComment = false;
      console.log('posted!');
    })
  }

  getUserData() {
    if (localStorage.length && localStorage.getItem('bookForumToken')) {
      let userData = localStorage.getItem('bookForumToken');
      this.userData = JSON.parse(userData as string);
    }
  }
  
  moreComments(): void {
    if(this.book.comments.length < this.commentCount + 10) {
      this.commentCount += this.book.comments.length % 10 ;
    } else {
      this.commentCount += 10;
    }
  }

  openCommentForm(): void {
    this.readyToComment = true;
    setTimeout(() => {
      let elem: HTMLButtonElement = document.body.querySelector('.form') as HTMLButtonElement;
      elem.scrollIntoView({
        behavior: "smooth",
        block: "end"
      });
    }, 10)
  }

}

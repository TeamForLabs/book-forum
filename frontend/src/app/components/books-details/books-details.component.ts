import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IBookResponse } from 'src/app/shared/interfaces/book.interface';
import { ICommentRequest } from 'src/app/shared/interfaces/comment.interface';
import { IUserData } from 'src/app/shared/interfaces/user-data.interface';
import { BooksService } from 'src/app/shared/services/books/books.service';
import { CommentsService } from 'src/app/shared/services/comments/comments.service';
import { LoginService } from 'src/app/shared/services/login/login.service';

@Component({
  selector: 'app-books-details',
  templateUrl: './books-details.component.html',
  styleUrls: ['./books-details.component.scss']
})
export class BooksDetailsComponent implements OnInit {

  public book!: IBookResponse;
  public commentForm!: FormGroup
  public readyToComment = false;
  public userData!: IUserData;
  public isLoggedIn = false;
  public bookId!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private booksService: BooksService,
    private fb: FormBuilder,
    private commentsService: CommentsService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = Boolean(localStorage.getItem('bookForumToken'));
    this.initCommentForm();
    this.loadBook();
    this.loginService.authAction.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn as boolean;
    })
  }

  loadBook(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.booksService.getOne(id).subscribe(data => {
      console.log(data);
      this.book = data;
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
      username: this?.userData?.username || this.commentForm.value.commenter,
      text: this.commentForm.value.comment
    }
    console.log(comment);
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

}

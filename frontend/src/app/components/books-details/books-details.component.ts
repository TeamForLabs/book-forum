import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IBookResponse } from 'src/app/shared/interfaces/book.interface';
import { BooksService } from 'src/app/shared/services/books/books.service';

@Component({
  selector: 'app-books-details',
  templateUrl: './books-details.component.html',
  styleUrls: ['./books-details.component.scss']
})
export class BooksDetailsComponent implements OnInit {

  public book!: IBookResponse;
  public commentForm!: FormGroup

  constructor(
    private activatedRoute: ActivatedRoute,
    private booksService: BooksService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initCommentForm();
    this.loadBook();
  }

  loadBook(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.booksService.getOne(id).subscribe(data => {
      this.book = data;
    }, err => {
      console.log(`Could not get the book (id: ${id})`, err);
    });
  }

  initCommentForm(): void {
    this.commentForm = this.fb.group({
      commenter: [null],
      comment: [null, Validators.required]
    })
  }

}

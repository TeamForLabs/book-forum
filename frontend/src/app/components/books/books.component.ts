import { Component, OnInit } from '@angular/core';
import { IBookResponse } from 'src/app/shared/interfaces/book.interface';
import { environment } from 'src/environments/environment';
import { BooksService } from 'src/app/shared/services/books/books.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  public books!: Array<IBookResponse>;
  public booksTotal!: number;
  public booksBatchSize!: number;
  public booksNextBatch: string | null = null
  public booksPrevBatch: string | null = null;
  public booksCurrBatch!: number;
  private url = environment.BACKEND_URL;
  private api = { books: `${this.url}/books/` }

  constructor(
    private booksService: BooksService,
  ) { }

  ngOnInit(): void {
    this.getBooksData(19);
  }

  getBooksData(page?: number): void {
    this.booksService.getPage(page).subscribe(data => {
      this.booksTotal = data.count;
      this.booksPrevBatch = data.previous;
      this.booksNextBatch = data.next;
      this.booksBatchSize = data.results.length;
      if(data.next) {
        this.booksCurrBatch = Number((data.next as string).match(/page=(\d+)/)?.[1]) - 1;
      } else {
        this.booksCurrBatch = Number((data.previous as string).match(/page=(\d+)/)?.[1]) + 1;
      }
      this.books = data.results;
    }, err => {
      console.log('error =>', err);
    });
  }
}

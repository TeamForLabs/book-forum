import { Component, OnInit } from '@angular/core';
import { IBookResponse } from 'src/app/shared/interfaces/book.interface';
import { BooksService } from 'src/app/shared/services/books/books.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

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

  public routerEventSub!: Subscription;

  constructor(
    private booksService: BooksService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getBooksData(1);
    this.routerEventSub = this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        const page = Number(this.activatedRoute.snapshot.paramMap.get('page'));
        this.getBooksData(page);
      }
    })
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

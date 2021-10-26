import { Component, OnInit } from '@angular/core';
import { IBookResponse } from 'src/app/shared/interfaces/book.interface';
import { BooksService } from 'src/app/shared/services/books/books.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookmarksService } from 'src/app/shared/services/bookmarks/bookmarks.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  public authors!: any;
  public genres!: any;

  public routerEventSub!: Subscription;

  public searchForm!: FormGroup;
  public searchParams = {
    search: "",
    page: 1,
  }
  public isDisabled = false;
  public currPage!: number;

  constructor(
    private booksService: BooksService,
    private bookmarksService: BookmarksService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) { }


  ngOnInit(): void {
    this.currPage = Number(this.activatedRoute.snapshot.queryParams.page);
    this.getBooksData(this.activatedRoute.snapshot.queryParams);
    this.activatedRoute.queryParams.subscribe(params => {
      this.currPage = Number(params.page);
      this.getBooksData(params);
    })
    this.getGenres();
    this.getAuthors();
    this.initSearchForm();
  }

  initSearchForm() {
    this.searchForm = this.fb.group({
      searchString: ["смерть"],
      searchOptions: [Validators.required],
      published_year: [null],
      genre: ['Не вибрано'],
      author: ['Не вибрано']
    });
  }

  onChangePage(page: number) {
    this.router.navigate(['/books'], {queryParams: {page: page}, queryParamsHandling: "merge"});
  }

  startSearch(): void {
    this.searchParams.search = this.searchForm.value.searchString;
    this.searchParams.page = 1;
    const p = this.booksService.cleanParams(this.searchParams);
    this.router.navigate(['/books'], {
      queryParams: p
    });
  }


  getBooksData(params: any): void {
    this.booksService.getCustom(params).subscribe(data => {
      this.deconstractBooksData(data);
    });
  }

  getGenres(): void {
    this.booksService.getGenres().subscribe(genres => {
      this.genres = [
        // { id: "", title: "Вибери жанр" },
        ... genres
      ]
    })
  }

  getAuthors(): void {
    this.booksService.getAuthors().subscribe(authors => {
      this.authors = [
        // { id: "", full_name: "Вибери автора"},
        ... authors
      ]
    })
  }

  createBookmark(event: MouseEvent): void {
    const id: string = (event.target as HTMLElement).dataset.bookId as string;
    this.bookmarksService.addBookmark(id).subscribe(() => {
      this.toastr.success('Додано в закладки')
      this.bookmarksService.added.next(true);
    }, err => {
      this.toastr.error('Не вдалося створити закладку')
    });
  }

  onSearchOptionChange(elem: HTMLInputElement): void {
    this.searchForm.patchValue({
      searchOptions: elem.value
    });
  }

  deconstractBooksData(data: any): void {
    this.booksTotal = data.count;
    this.booksPrevBatch = data.previous;
    this.booksNextBatch = data.next;
    this.booksBatchSize = 12;
    if (data.next) {
      this.booksCurrBatch = Number((data.next as string).match(/page=(\d+)/)?.[1]) - 1;
    } else if (data.previous) {
      this.booksCurrBatch = Number((data.previous as string).match(/page=(\d+)/)?.[1]) + 1;
    } else {
      this.booksCurrBatch = 1;
    }
    this.books = data.results;
  }

  composeQuery() {
    let p = this.searchParams;
    return ``
  }
}
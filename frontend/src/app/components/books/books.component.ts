import { Component, OnInit } from '@angular/core';
import { IBookResponse } from 'src/app/shared/interfaces/book.interface';
import { BooksService } from 'src/app/shared/services/books/books.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookmarksService } from 'src/app/shared/services/bookmarks/bookmarks.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup} from '@angular/forms';

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
  public isDisabled = false;
  public currPage!: number;
  public detailedSearch = false;

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

  clearRouter(): void {
    this.router.navigate(['/books']);
    this.initSearchForm();
  }

  initSearchForm() {
    this.searchForm = this.fb.group({
      search: [""],
      published_year: [null],
      genres: [''],
      author: [''],
    });
  }

  onChangePage(page: number) {
    this.router.navigate(['/books'],
      { queryParams: { page: page },
        queryParamsHandling: "merge" 
      });
  }

  startSearch(): void {
    const p = this.booksService.cleanParams(this.searchForm.value);
    p.page = 1;
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
        ...genres
      ]
    })
  }

  getAuthors(): void {
    this.booksService.getAuthors().subscribe(authors => {
      this.authors = [
        // { id: "", full_name: "Вибери автора"},
        ...authors
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

}
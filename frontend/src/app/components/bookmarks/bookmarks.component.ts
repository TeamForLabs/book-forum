import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBookResponse } from 'src/app/shared/interfaces/book.interface';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { BookmarksService } from 'src/app/shared/services/bookmarks/bookmarks.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {

  @Input('opened') opened = true;
  @Output('closeBookmarks') closeBookmarks = new EventEmitter<boolean>();
  public bookmarks: Array<IBookResponse> = [];

  constructor(
    private auth: AuthService,
    private bookmarksService: BookmarksService
  ) { }

  ngOnInit(): void {
    this.loadBookmarks();
    this.bookmarksService.added.subscribe(() => {
      this.loadBookmarks();
    });
  }

  loadBookmarks(): void {
    this.auth.getUserData().subscribe(data => {
      this.bookmarks = data.bookmarks
    });
  }

  onClose() {
    this.closeBookmarks.emit(false);
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookmarksService {

  private url = environment.BACKEND_API_URL;
  private api = { bookmark: `${this.url}/books`}
  private httpHeaders!: HttpHeaders;


  constructor(
    private httpClient: HttpClient
  ) { }

  addBookmark(bookId: number, token: string): Observable<void> {
    this.httpHeaders = new HttpHeaders({
      'Authorization': `Token ${token}`
    });
    this.updateAPIWithID(bookId);
    return this.httpClient.post<void>(this.api.bookmark, "");
  }

  private updateAPIWithID(id: number) {
    if (id) {
      this.api.bookmark = `${this.url}/books/${id}/bookmark`;
    } else {
      this.api.bookmark = '';
    }
  }
}

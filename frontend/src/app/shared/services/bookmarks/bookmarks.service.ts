import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookmarksService {

  private url = environment.BACKEND_URL;
  private api = { bookmark: `${this.url}/api/books` }
  private httpHeaders!: HttpHeaders;

  public added = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }


  addBookmark(bookId: string): Observable<void> {
    this.initHeaders();
    this.updateAPIWithID(bookId);
    return this.http.post<void>(this.api.bookmark, "", { headers: this.httpHeaders });
  }


  private updateAPIWithID(id: string) {
    if (id) {
      this.api.bookmark = `${this.url}/api/books/${id}/bookmark`;
    } else {
      this.api.bookmark = '';
    }
  }

  private initHeaders(): void {
    if(this.auth.isAuthorized()) {
      this.httpHeaders = new HttpHeaders({
        'Authorization': `Token ${this.auth.getToken()}`
      });
    }
  }
}

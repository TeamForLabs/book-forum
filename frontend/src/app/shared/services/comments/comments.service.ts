import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICommentRequest } from '../../interfaces/comment.interface';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private url = environment.BACKEND_URL;
  private api = { comment: '' }
  private httpHeaders!: HttpHeaders;

  constructor(
    private http: HttpClient,
  ) {
  }

  create(comment: ICommentRequest, bookID: number, token: string): Observable<void> {
    this.httpHeaders = new HttpHeaders({
      'Authorization': `Token ${token}`
    })
    this.updateAPIWithID(bookID);
    return this.http.post<void>(this.api.comment, comment, { headers: this.httpHeaders });
  }

  private updateAPIWithID(id: number) {
    if (id) {
      this.api.comment = `${this.url}/api/books/${id}/comment`;
    } else {
      this.api.comment = '';
    }
  }
}

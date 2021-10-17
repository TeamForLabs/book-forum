import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBookResponse, IBookRequest } from '../../interfaces/book.interface';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private url = environment.BACKEND_API_URL;
  private api = { books: `${this.url}/books` }

  constructor(
    private http: HttpClient
  ) { }

  getPage(page?: number) {
    let query = page ? `?page=${page}` : '';
    return this.http.get<any>(`${this.api.books}${query}`);
  }

  getOne(id: number): Observable<IBookResponse> {
    return this.http.get<IBookResponse>(`${this.api.books}/${id}`);
  }

  create(book: IBookRequest): Observable<void> {
    return this.http.post<void>(this.api.books, book);
  }

  update(book: IBookResponse, id: number) {
    return this.http.put<void>(`${this.api.books}/${id}`, book);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.api.books}/${id}`);
  }

}

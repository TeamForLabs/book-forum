import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBookResponse, IBookRequest } from '../../interfaces/book.interface';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private url = environment.BACKEND_URL;
  private api = { books: `${this.url}/api/books`, authors: `${this.url}/api/authors/`, genres:  `${this.url}/api/genres/` }

  constructor(
    private http: HttpClient
  ) { }

  getPage(page?: number) {
    let query = page ? `?page=${page}` : '';
    return this.http.get<any>(`${this.api.books}/${query}`);
  }

  getAuthors(): Observable<any> {
    return this.http.get<any>(this.api.authors);
  }

  getGenres(): Observable<any> {
    return this.http.get<any>(this.api.genres);
  }

  getOne(id: number): Observable<IBookResponse> {
    return this.http.get<IBookResponse>(`${this.api.books}/${id}`);
  }

  getCustom(params: any): Observable<any> {
    let q = this.query(params);
    console.log('query', q);
    return this.http.get<any>(`${this.api.books}/${q}`);
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

  getByString(string: string): Observable<any> {
    let query = `search=${string}`;
    return this.http.get<any>(`${this.api.books}?${query}`)
  }

  query(params: any): string {
    let q = '?';
    for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        const value = params[key];
        if(!value) continue;
        q += `${key}=${value}&`;
      }
    }
    return q.slice(0,-1);
  }

  cleanParams(params: any) {
    let out: any = {};
    for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        const value = params[key];
        if(!value) continue;
        out[key] = value;
      }
    }
    return out;
  }
}

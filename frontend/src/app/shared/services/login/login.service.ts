import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUserRequest, IUserResponse } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  private url = environment.BACKEND_AUTH_URL;
  private api = { auth: `${this.url}/` };
  public authAction = new Subject();

  constructor(
    private http: HttpClient
  ) { }

  login(user: IUserRequest): Observable<IUserResponse> {
    return this.http.post<IUserResponse>(this.api.auth,user);
  }

  logout(): Observable<void> {
    return of(localStorage.removeItem('bookForumToken'));
  }

}

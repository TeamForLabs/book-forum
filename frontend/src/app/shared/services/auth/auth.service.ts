import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUserRequest, IUserResponse } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private url = environment.BACKEND_URL;
  private api = { auth: `${this.url}/auth/`, me: `${this.url}/api/me` };
  public authAction = new Subject<boolean>();

  constructor(
    private http: HttpClient
  ) { }

  login(user: IUserRequest): Observable<IUserResponse> {
    return this.http.post<IUserResponse>(this.api.auth, user);
  }

  logout(): Observable<void> {
    return of(localStorage.removeItem('bookForumToken'));
  }

  isAuthorized(): boolean {
    return Boolean(localStorage.length && localStorage.getItem('bookForumToken'));
  }

  getToken(): string   {
    if(this.isAuthorized()) {
      return JSON.parse(localStorage.getItem('bookForumToken') as string).token as string;
    } else {
      return "";
    }
  }

  getUserData(): Observable<any> {
    return this.http.get<any>(this.api.me, { headers: {
      'Authorization': `Token ${this.getToken()}`
    }});
  }

}

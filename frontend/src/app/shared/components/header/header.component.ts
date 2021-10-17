import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isLoggedIn = false;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(localStorage.length) {
      if(localStorage.getItem('bookForumToken')) {
        this.isLoggedIn = true;
      }
    }
    this.loginService.authAction.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn as boolean;
    });
  }

  logout(): void {
    this.loginService.logout().subscribe(() => {
      this.loginService.authAction.next(false);
      this.router.navigate(['home']);
    })
  }


}

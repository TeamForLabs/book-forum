import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isLoggedIn = false;
  @Output('openBookmarks') openBookmarks = new EventEmitter<boolean>();

  constructor(
    private loginService: AuthService,
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
      this.router.navigate(['..']);
    })
  }

  onOpenBookmarks(): void {
    this.openBookmarks.emit(false);
  }

}

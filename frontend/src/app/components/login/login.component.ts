import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  @ViewChild('wrongPassword') wrongPassword!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  login() {
    console.log('Sent request =>', this.loginForm.value);
    this.auth.login(this.loginForm.value).subscribe(data => {
      const userData = {
        username: this.loginForm.value.username,
        token: data.token,
      }
      localStorage.setItem('bookForumToken', JSON.stringify(userData));
      this.router.navigate(['..'])
      this.auth.authAction.next(true);
    }, err => {
      console.dir(err);
      this.wrongPassword.nativeElement.classList.add('active');
      localStorage.removeItem('bookForumToken');
      this.auth.authAction.next(false);
    })
  }


}

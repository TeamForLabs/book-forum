import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/login/login.service';

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
    private loginService: LoginService,
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
    this.loginService.login(this.loginForm.value).subscribe(data => {
      localStorage.setItem('bookForumToken', data.token);
      this.router.navigate(['home']);
      this.loginService.authAction.next(true);
    }, err => {
      console.dir(err);
      this.wrongPassword.nativeElement.classList.add('active');
      localStorage.removeItem('bookForumToken');
      this.loginService.authAction.next(false);
    })
  }


}

import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onSignin(form: NgForm) {
    const {email, password} = form.value;
    if (email == '' || password == '') {
      return;
    }
    this.authService.onSignin(form.value);
    this.router.navigate(['/']);
  }
}

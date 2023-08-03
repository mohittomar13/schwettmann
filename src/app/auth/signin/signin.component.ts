import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  isLoading: boolean = false;

  constructor(
    private authService: AuthService
    ) {}

  onLogin(form: NgForm) {
    console.log(form.value, 'form.value', 'clog');
    this.authService.onLogin(form.value);

  }
}

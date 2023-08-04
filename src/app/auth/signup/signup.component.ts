import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  public isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSignup(form: NgForm) {
    const {email, password} = form.value;
    if (email == '' || password == '') {
      return;
    }
    this.authService.onSignup(form.value).subscribe((response) => {
      this.router.navigate(['/']);
    });
  }
}

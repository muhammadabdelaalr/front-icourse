import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide = true;
  remember = false;
  token!: string;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.loginForm.value).subscribe(
      response => {
        console.log(response);
     
        this.router.navigate(['/home']);
        // Handle your response here. This could be navigating to another page, showing a success message, etc.
      },
      error => {
        console.error(error);
        // Handle your error here. This could be showing an error message to the user, etc.
      }
    );
    console.log(this.loginForm.value);
  }

}

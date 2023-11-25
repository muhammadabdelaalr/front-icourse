import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

export interface LoginDetail {
  status: number;
  message: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent {
  loginDetail: LoginDetail = {status: 0, message: ''}; 
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
    this.authService.login(this.loginForm.value).subscribe((response: any) => {
      this.loginDetail = response as LoginDetail; // Corrected here
      if (this.loginDetail.status === 200){
        console.log(response);
        this.router.navigate(['/home']);
      } else {
        console.log(response);
        alert(this.loginDetail.message);
      }
    },
    error => {
      console.error(error);
      // Handle your error here. This could be showing an error message to the user, etc.
    });
    console.log(this.loginForm.value);
  }
}

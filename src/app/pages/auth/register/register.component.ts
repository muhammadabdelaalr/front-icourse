import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  hide = true;
  token!: string;

  registerForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/
      ),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      this.matchValue('password'),
    ]),
  });
  matchValue(matchTo: string): ValidatorFn {
    return (control: any) => {
      return control?.value === control.parent?.controls[matchTo].value
        ? null
        : { isMatching: true };
    };
  }
  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  constructor(private authService: AuthService) {}

  register() {
    console.log(this.registerForm.value);
    this.registerForm.value;
  }
}

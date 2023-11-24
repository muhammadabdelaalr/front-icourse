import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  hide = true;
  token!: string;

  registerSub!: Subscription;

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

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.registerSub.unsubscribe();
  }

  register() {
    this.registerSub = this.authService.register(this.registerForm.value).subscribe({
      next: (res) => {
        console.log(res);
      }, error: (err) => {
        console.log(err);
      }
    })
    console.log(this.registerForm.value);
  }

}

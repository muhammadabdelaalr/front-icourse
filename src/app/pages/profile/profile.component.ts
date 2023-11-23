import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  lang!: boolean;
  positionMenu: any;

  profile = {
    // fullName: '',
    // email: '',
    // phone: '',
    // city: '',
    // address: '',
    fullName: 'Mohamed Abdelaal',
    email: 'mohamed@mail.com',
    phone: '01095245526',
    city: 'Cairo',
    address: 'Cairo, Egypt',
  };

  profileForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    address: new FormControl(''),
  });

  constructor() {
    if (localStorage.getItem('curentLang') == 'ar') {
      this.lang = true;
      this.positionMenu = 'after';
    } else {
      this.lang = false;
      this.positionMenu = 'before';
    }
  }

  updateProfile() {
    console.log(this.profileForm.value);
  }
}

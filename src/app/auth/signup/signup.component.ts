import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  signUpForm!: FormGroup;

  ngOnInit() {
    this.signUpForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^(\\d{3}-\\d{2}-\\d{2}-\\d{2}|\\d{9})$'),
      ]),
      mail: new FormControl('', [Validators.required, Validators.email]),
      facebook: new FormControl('', [
        Validators.pattern('https?://(www.)?facebook.com/.+'),
      ]),
      instagram: new FormControl('', [
        Validators.pattern('https?://(www.)?instagram.com/.+'),
      ]),
    });
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value);
    } else {
      console.log('Form is invalid');
      console.log(this.signUpForm.value);
    }
  }
}

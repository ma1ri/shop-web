import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent {
  signUpForm!: FormGroup;

  isAuthenticated = false;
  userId!: string;
  private queryParamsSubscription!: Subscription;
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (params) => {
        this.userId = params['userId'];
        console.log('Current User id', this.userId);
        this.isAuthenticated = this.authService.isAuthenticated();
      }
    );

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

  onSave() {
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value);
    } else {
      console.log('Form is invalid');
      console.log(this.signUpForm.value);
    }
  }

  onCancel() {
    this.signUpForm.reset();
    this.signUpForm.disable();
  }
}

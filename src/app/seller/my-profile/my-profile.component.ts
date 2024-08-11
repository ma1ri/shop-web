import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent {
  signUpForm!: FormGroup;
  currentDetails!: User;

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
        if (this.userId) {
          this.authService.getUserDetails(this.userId).subscribe((res) => {
            this.currentDetails = res;
            this.signUpForm = new FormGroup({
              name: new FormControl(res.name, [Validators.required]),
              lastName: new FormControl(res.lastName, [Validators.required]),
              phone: new FormControl(res.phone, [
                Validators.required,
                Validators.pattern('^(\\d{3}-\\d{2}-\\d{2}-\\d{2}|\\d{9})$'),
              ]),
              mail: new FormControl(res.mail, [
                Validators.required,
                Validators.email,
              ]),
              facebook: new FormControl(res.facebook, [
                Validators.pattern('https?://(www.)?facebook.com/.+'),
              ]),
              instagram: new FormControl(res.instagram, [
                Validators.pattern('https?://(www.)?instagram.com/.+'),
              ]),
            });
            this.signUpForm.disable();
          });
        }
      }
    );
  }

  onSave() {
    if (this.signUpForm.valid) {
      this.authService
        .updateUser(this.userId, this.signUpForm.value)
        .subscribe((res) => {
          this.signUpForm.disable();
        });
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

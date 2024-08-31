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
  currentDetails!: User | null;

  isAuthenticated = false;
  uploadedImage!: string;
  notValidMimeType = false;
  userId!: string;
  private queryParamsSubscription!: Subscription;
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId() || '';
    console.log('Current User id', this.userId);
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

  onImagePicked(event: Event) {
    this.notValidMimeType = false;
    const ev = event.target as HTMLInputElement;
    const file = ev?.files ? ev.files[0] : null;
    if (!file) return;

    const allowedMimeTypes = [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/gif',
    ];
    if (!allowedMimeTypes.includes(file.type)) {
      this.notValidMimeType = true;
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.uploadedImage = reader.result as string;
      const formData = new FormData();
      formData.append('image', file, file.name);
      this.authService
        .updateUser(this.userId, formData)
        .subscribe((response) => {
          console.log(response);
        });
    };
    reader.readAsDataURL(file);
  }

  onCancel() {
    this.signUpForm.disable();
  }
}

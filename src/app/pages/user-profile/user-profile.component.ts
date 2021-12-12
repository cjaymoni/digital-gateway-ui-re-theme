import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserProfile } from 'src/app/models/user-auth.model';
import { ImageUploadComponent } from 'src/app/shared-ui-modules/image-upload/image-upload.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent implements OnInit {
  @ViewChild('imageUpload', { static: true })
  imageUploadComponent: ImageUploadComponent | null = null;

  profileForm!: FormGroup;

  profile!: UserProfile;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', Validators.required],
      website: [''],
      facebook: [''],
      youtube: [''],
      twitter: [''],
      bio: [''],
      address: [''],
      ghana_post: [''],
      webdistrictsite: [''],
      avatar: [],
    });
  }

  get profileHasImage() {
    return this.avatarImage.value?.[0]?.avatarImage;
  }

  get avatarImage() {
    return this.profileForm.get('avatar') as FormControl;
  }
  removeImage() {
    this.avatarImage.setValue([]);
  }

  onEditProfile() {}
}

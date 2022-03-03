import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie';
import { filter, Subscription, take, tap } from 'rxjs';
import { APP_USER_TOKEN } from 'src/app/config/app-config';
import { UserProfile } from 'src/app/models/user-auth.model';
import {
  ImageUploadComponent,
  ImageUploadMode,
} from 'src/app/shared-ui-modules/image-upload/image-upload.component';
import { userProfileActions } from 'src/app/store/actions/user-profile.actions';
import { userProfileSelectors } from 'src/app/store/selectors/user-profile.selectors';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent implements OnInit, OnDestroy {
  selectedUser$ = this.store.select(userProfileSelectors.selectedUserProfile);

  @ViewChild('imageUpload')
  imageUploadComponent: ImageUploadComponent | null = null;

  imageUploadMode = ImageUploadMode.Basic;

  profileForm!: FormGroup;

  profile!: UserProfile;

  user!: any;

  subscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private cookieService: CookieService
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(userProfileActions.clearAllSelected());
  }
  ngOnInit() {
    this.profileForm = this.fb.group({
      email: ['', [Validators.required]],
      name: ['', [Validators.required]],
      website: [''],
      facebook: [''],
      youtube: [''],
      twitter: [''],
      bio: [''],
      address: [''],
      ghana_post: [''],
      district: [''],
      avatar: [''],
    });
    this.getloggedInUser();
    this.subscription = this.getUserProfileToEditSubscription();
  }

  get avatarImage() {
    return this.profileForm.get('avatar') as FormControl;
  }

  removeImage() {
    this.avatarImage.setValue([]);
  }

  private getUserProfileToEditSubscription() {
    return this.store
      .select(userProfileSelectors.selectedUserProfileToEdit)
      .pipe(
        filter(data => !!data),
        take(1),
        tap((userProfile: UserProfile) => {
          this.profile = userProfile;
          this.profileForm.patchValue({
            ...userProfile,
            email: this.user.email,
          });
        })
      )
      .subscribe();
  }

  getloggedInUser() {
    this.user = this.cookieService.getObject(APP_USER_TOKEN);
  }

  onEditProfile() {
    const profileToSend = this.profileForm.value;
    const toSend = {
      email: profileToSend.email,
      name: profileToSend.name,
      website: profileToSend.website,
      twitter: profileToSend.twitter,
      facebook: profileToSend.facebook,
      youtube: profileToSend.youtube,
      bio: profileToSend.bio,
      address: profileToSend.address,
      ghana_post: profileToSend.ghana_post,
      district: profileToSend.district,
    };

    const images: any =
      this.imageUploadComponent?.getFilesToUpload()?.length > 0
        ? this.imageUploadComponent?.getFilesToUpload()
        : undefined;

    this.store.dispatch(
      userProfileActions.editUserProfile({
        userProfile: { ...toSend, id: this.user.profile_id },
        imageToUpload: images,
      })
    );
  }

  getImageToUpload() {
    return (
      this.imageUploadComponent?.getFilesToUpload()?.[0]?.objectURL || null
    );
  }

  onUploadCancel() {
    this.imageUploadComponent?.clear();
  }
}

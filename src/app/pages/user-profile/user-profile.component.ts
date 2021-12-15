import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { User, UserProfile } from 'src/app/models/user-auth.model';
import { ImageUploadComponent } from 'src/app/shared-ui-modules/image-upload/image-upload.component';
import { userProfileSelectors } from 'src/app/store/selectors/user-profile.selectors';
import { userAuthSelectors } from '../../store/selectors/user-auth.selectors';
import { filter, map, Subscription, tap } from 'rxjs';
import { userProfileActions } from 'src/app/store/actions/user-profile.actions';
import { UserProfileService } from './services/user-profile.service';
import { PrimeNgAlerts } from 'src/app/config/app-config';
import { AppAlertService } from 'src/app/shared-ui-modules/alerts/service/app-alert.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent implements OnInit, OnDestroy {
  selectedUser$ = this.store.select(userProfileSelectors.selectedUserProfile);

  @ViewChild('imageUpload', { static: true })
  imageUploadComponent: ImageUploadComponent | null = null;

  profileForm!: FormGroup;

  profile!: UserProfile;

  user!: any;

  subscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private alert: AppAlertService,
    private userProfileService: UserProfileService
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(userProfileActions.clearAllSelected());
  }
  ngOnInit() {
    this.profileForm = this.fb.group({
      email: [''],
      name: [''],
      website: [''],
      facebook: [''],
      youtube: [''],
      twitter: [''],
      bio: [''],
      address: [''],
      ghana_post: [''],
      district: [''],
      avatar: [],
    });

    this.subscription = this.getUserProfileToEditSubscription();
    this.getloggedInUser();
  }

  get profileHasImage() {
    return this.avatarImage.value?.[0]?.avatar;
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
    return this.store
      .select(userAuthSelectors.loggedInUser)
      .pipe(
        filter(data => !!data),
        tap(user => {
          this.user = user;
        })
      )
      .subscribe();
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

    const images: any = (this.avatarImage.value || []).concat(
      this.imageUploadComponent?.getFilesToUpload() || []
    );
    this.store.dispatch(
      userProfileActions.editUserProfile({
        userProfile: { ...toSend, id: this.user.id },
        imageToUpload: images,
      })
    );
  }
}

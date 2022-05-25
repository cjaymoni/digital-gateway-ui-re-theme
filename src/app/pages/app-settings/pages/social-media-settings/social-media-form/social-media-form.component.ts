import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, Subscription, tap } from 'rxjs';
import { RouterOutlets } from 'src/app/config/app-config';
import { NavigatorService } from 'src/app/services/navigator.service';
import { socialMediaSelectors } from 'src/app/store/selectors/socialmedia.selectors';
import { SocialMedia } from 'src/app/models/social-media.model';
import { socialmediaActions } from 'src/app/store/actions/socialmedia.actions';

@Component({
  selector: 'app-social-media-form',
  templateUrl: './social-media-form.component.html',
  styleUrls: ['./social-media-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocialMediaFormComponent implements OnInit, OnDestroy {

  createForm = true;

  socialmediaForm!: FormGroup;

  socialmedia!: SocialMedia;

  subscription!: Subscription;

  default = [
    { name: 'Default', value: true },
    { name: 'Not-Default', value: false },
  ];

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private navigator: NavigatorService,
    private action$: Actions
  ) {}

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnInit() {
    this.socialmediaForm = this.fb.group({
      is_default: [this.default[0], [Validators.required]],
      twitter: ['', [Validators.required]],
      facebook: ['', [Validators.required]],
      Instagram: [''],
    });

    this.subscription = this.getSocialMediaToEditSubscription();
    this.subscription.add(this.addOrEditSubscription());
  }

  goBack() {
    this.navigator.goBack();
  }

  onAddOrUpdateMedia() {
    if (this.socialmediaForm.valid) {
      const formValues = this.socialmediaForm.getRawValue();

      const newMedia = {
        twitter: formValues.twitter,
        facebook: formValues.facebook,
        Instagram: formValues.Instagram,
        is_default: formValues.is_default.value,
      };

      if (this.createForm) {
        this.store.dispatch(
          socialmediaActions.addSocialMedia({
            socialmedia: { ...newMedia, author: 1 },
          })
        );
      } else {
        this.store.dispatch(
          socialmediaActions.editSocialMedia({
            socialmedia: { ...newMedia, author: 1, id: this.socialmedia.id },
          })
        );
      }
    }
  }

  private getSocialMediaToEditSubscription() {
    return this.store
      .select(socialMediaSelectors.selectedSocialMedia)
      .pipe(
        filter(data => !!data),
        tap((socialmedia: SocialMedia) => {
          this.socialmediaForm.patchValue({
            ...socialmedia,
            is_default: {
              name: socialmedia.is_default === true? 'Default' : 'Not-Default',
              value: socialmedia.is_default,
            },
          });

          this.socialmedia = socialmedia;
          this.createForm = false;
          this.navigator.setPanelTitle('Update Social Media');
        })
      )
      .subscribe();
  }
  private addOrEditSubscription() {
    return this.action$
      .pipe(
        ofType(
          socialmediaActions.editSocialMediaSuccessful,
          socialmediaActions.addSocialMediaSuccessful
        ),
        tap(_ => {
          this.navigator.closeModal();
        })
      )
      .subscribe();
  }

}

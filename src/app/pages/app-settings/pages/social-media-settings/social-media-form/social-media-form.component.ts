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
export class SocialMediaFormComponent implements OnInit {

  createForm = true;

  socialmediaForm!: FormGroup;

  socialmedia!: SocialMedia;

  mediaTypes = [
    { name: 'Audio', value: 'audio' },
    { name: 'Video', value: 'video' },
  ];

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private navigator: NavigatorService,
    private action$: Actions
  ) {}

  ngOnInit() {
    this.socialmediaForm = this.fb.group({
      twitter: ['', [Validators.required]],
      facebook: ['', [Validators.required]],
      Instagram: [''],
    });
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
      };

      if (this.createForm) {
        this.store.dispatch(
          socialmediaActions.addSocialMedia({
            socialmedia: { ...newMedia, author: 1 },
          })
        );
      } else {
        // this.store.dispatch(
        //   socialmediaActions.editSocialMedia({
        //     socialmedia: { ...newMedia, author: 1, id: this.socialmedia.id },
        //   })
        // );
      }
    }
  }

}

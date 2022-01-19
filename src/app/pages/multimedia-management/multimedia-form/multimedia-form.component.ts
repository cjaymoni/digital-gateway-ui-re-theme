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
import { Title } from '@angular/platform-browser';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, Subscription, tap } from 'rxjs';
import { RouterOutlets } from 'src/app/config/app-config';
import { NavigatorService } from 'src/app/services/navigator.service';
import { multiMediaSelectors } from '../../../store/selectors/multimedia.selectors';
import { MultiMedia } from 'src/app/models/multimedia.model';
import { multimediaActions } from 'src/app/store/actions/multimedia.actions';

@Component({
  selector: 'app-multimedia-form',
  templateUrl: './multimedia-form.component.html',
  styleUrls: ['./multimedia-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultimediaFormComponent implements OnInit, OnDestroy {
  createForm = true;

  multimediaForm!: FormGroup;

  subscription!: Subscription;

  multimedia!: MultiMedia;

  mediaTypes = [
    { name: 'Audio', value: 'audio' },
    { name: 'Video', value: 'video' },
  ];

  featuredTypes = [
    { name: 'Featured', value: 'true' },
    { name: 'Non-Featured', value: 'false' },
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
    this.multimediaForm = this.fb.group({
      media_type: ['', [Validators.required]],
      featured: [this.featuredTypes[0], [Validators.required]],
      url: ['', [Validators.required]],
    });

    this.subscription = this.getMUltiMediaToEditSubscription();
    this.subscription.add(this.addOrEditSubscription());
  }

  goBack() {
    this.navigator.goBack();
  }

  onAddOrUpdateMedia() {
    if (this.multimediaForm.valid) {
      const formValues = this.multimediaForm.getRawValue();

      const newMedia = {
        media_type: formValues.media_type.value,
        featured: formValues.featured.value,
        url: formValues.url,
      };

      if (this.createForm) {
        this.store.dispatch(
          multimediaActions.addMultiMedia({
            multimedia: { ...newMedia, author: 1 },
          })
        );
      } else {
        this.store.dispatch(
          multimediaActions.editMultiMedia({
            multimedia: { ...newMedia, author: 1, id: this.multimedia.id },
          })
        );
      }
    }
  }

  private getMUltiMediaToEditSubscription() {
    return this.store
      .select(multiMediaSelectors.selectedMultiMedia)
      .pipe(
        filter(data => !!data),
        tap((multimedia: MultiMedia) => {
          this.multimediaForm.patchValue({
            ...multimedia,
            media_type: {
              name: this.capitalizeFirstLetter(multimedia.media_type),
              value: multimedia.media_type,
            },
            featured: {
              name: multimedia.featured,
              value: multimedia.featured,
            },
          });

          this.multimedia = multimedia;
          this.createForm = false;
          this.navigator.setPanelTitle('Update MultiMedia');
        })
      )
      .subscribe();
  }
  private capitalizeFirstLetter(string: any) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  private addOrEditSubscription() {
    return this.action$
      .pipe(
        ofType(
          multimediaActions.editMultiMediaSuccessful,
          multimediaActions.addMultiMediaSuccessful
        ),
        tap(_ => {
          this.navigator.closeModal();
        })
      )
      .subscribe();
  }
}

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
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, Subscription, tap } from 'rxjs';
import { RouterOutlets } from 'src/app/config/app-config';
import { NavigatorService } from 'src/app/services/navigator.service';
import { digitalLinkSelectors } from 'src/app/store/selectors/digital-link.selectors';
import { DigitalLink } from 'src/app/models/digital-link.model';
import { digitalLinkActions } from 'src/app/store/actions/digital-link.actions';

@Component({
  selector: 'app-digital-link-form',
  templateUrl: './digital-link-form.component.html',
  styleUrls: ['./digital-link-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DigitalLinkFormComponent implements OnInit, OnDestroy {

  createForm = true;

  digitalLinkFform!: FormGroup;

  subscription!: Subscription;

  digitalLink!: DigitalLink;

  featuredTypes = [
    { name: 'Featured', value: true },
    { name: 'Non-Featured', value: false },
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
    this.digitalLinkFform = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      featured: [this.featuredTypes[0], [Validators.required]],
      url: ['', [Validators.required]],
    });

    this.subscription = this.getDigitalLinkToEditSubscription();
    this.subscription.add(this.addOrEditSubscription());
  }

  goBack() {
    this.navigator.goBack();
  }

  onAddOrUpdateLink() {
    if (this.digitalLinkFform.valid) {
      const formValues = this.digitalLinkFform.getRawValue();

      const newLink = {
        title: formValues.title,
        description: formValues.description,
        featured: formValues.featured.value,
        url: formValues.url,
      };

      if (this.createForm) {
        this.store.dispatch(
          digitalLinkActions.addDigitalLink({
            digitalLink: { ...newLink },
          })
        );
      } else {
        this.store.dispatch(
          digitalLinkActions.editDigitalLink({
            digitalLink: { ...newLink, id: this.digitalLink.id },
          })
        );
      }
    }
  }

  private getDigitalLinkToEditSubscription() {
    return this.store
      .select(digitalLinkSelectors.selectedDigitalLink)
      .pipe(
        filter(data => !!data),
        tap((digitalLink: DigitalLink) => {
          this.digitalLinkFform.patchValue({
            ...digitalLink,
            featured: {
              name: digitalLink.featured === true? 'Featured' : 'Non-Featured',
              value: digitalLink.featured,
            },
          });

          this.digitalLink = digitalLink;
          this.createForm = false;
          this.navigator.setPanelTitle('Update DigitalLink');
        })
      )
      .subscribe();
  }
  private addOrEditSubscription() {
    return this.action$
      .pipe(
        ofType(
          digitalLinkActions.editDigitalLinkSuccessful,
          digitalLinkActions.addDigitalLinkSuccessful
        ),
        tap(_ => {
          this.navigator.closeModal();
        })
      )
      .subscribe();
  }

}

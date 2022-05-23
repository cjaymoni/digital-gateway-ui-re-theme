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
import { partnersSelectors } from 'src/app/store/selectors/partners.selectors';
import { IPartners } from 'src/app/models/partners.model';
import { partnersActions } from 'src/app/store/actions/partners.actions';
import { ImageUploadComponent } from 'src/app/shared-ui-modules/image-upload/image-upload.component';

@Component({
  selector: 'app-partners-form',
  templateUrl: './partners-form.component.html',
  styleUrls: ['./partners-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartnersFormComponent implements OnInit, OnDestroy {
  @ViewChild('imageUpload', { static: false })
  imageUploadComponent!: ImageUploadComponent;

  createForm = true;

  partnersForm!: FormGroup;

  subscription!: Subscription;

  partners!: IPartners;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private navigator: NavigatorService,
    private action$: Actions
  ) {}

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.store.dispatch(partnersActions.clearAllSelected())
  }

  ngOnInit() {
    this.partnersForm = this.fb.group({
      name: ['', [Validators.required]],
      desription: [''],
      url: ['', [Validators.required]],
      image: [],
    });

    this.subscription = this.getPartnersToEditSubscription();
    this.subscription.add(this.addOrEditSubscription());
  }

  get images() {
    return this.partnersForm.get('image') as FormControl;
  }

  get partnerHasImage() {
    return this.images?.value;
  }

  removeImage() {
    this.images.setValue('');
  }

  goBack() {
    this.navigator.goBack();
  }

  onAddOrUpdatePartner() {
    if (this.partnersForm.valid) {
      const formValues = this.partnersForm.value;

      const newLink = {
        name: formValues.name,
        desription: formValues.desription,
        url: formValues.url,
      };

      const image: any = (this.images.value || []).concat(
        this.imageUploadComponent?.getFilesToUpload() || []
      );

      if (this.createForm) {
        this.store.dispatch(
          partnersActions.addPartner({
            partners: { ...newLink },
            imageToUpload: image,
          })
        );
      } else {
        this.store.dispatch(
          partnersActions.editPartner({
            partners: { ...newLink, id: this.partners.id },
            imageToUpload: image,
          })
        );
      }
    }
  }

  private getPartnersToEditSubscription() {
    return this.store
      .select(partnersSelectors.selectedPartnerToEdit)
      .pipe(
        filter(data => !!data),
        tap((partners: IPartners) => {
          this.createForm = false;
          this.partners = partners;
          this.partnersForm.patchValue(partners);

          this.navigator.setPanelTitle('Update Partner');
        })
      )
      .subscribe();
  }

  private addOrEditSubscription() {
    return this.action$
      .pipe(
        ofType(
          partnersActions.editPartnerSuccessful,
          partnersActions.addPartnerSuccessful
        ),
        tap(_ => {
          this.partnersForm.reset();
          this.navigator.closeModal();
        })
      )
      .subscribe();
  }

}

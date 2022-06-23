import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavigatorService } from 'src/app/services/navigator.service';
import { FAQ } from '../../../../models/faqs.model';
import { filter, Subscription, tap } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { faqActions } from '../../../../store/actions/faq.actions';
import { faqSelectors } from '../../../../store/selectors/faq.selectors';

@Component({
  selector: 'app-faq-form',
  templateUrl: './faq-form.component.html',
  styleUrls: ['./faq-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqFormComponent implements OnInit {
  createForm = true;

  faqForm!: FormGroup;

  faq!: FAQ;

  subscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private navigator: NavigatorService,
    private store: Store,
    private action$: Actions
  ) {}
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
  ngOnInit() {
    this.faqForm = this.fb.group({
      question: ['', [Validators.required]],
      answer: ['', [Validators.required]],
      position: [''],
    });

    this.subscription = this.getFaqToEditSubscription();
    this.subscription.add(this.addOrEditSubscription());
  }

  goBack() {
    this.navigator.goBack();
  }

  onAddOrUpdateFaq() {
    if (this.faqForm.valid) {
      const formValues = this.faqForm.getRawValue();
      const newFaq = {
        question: formValues.question,
        answer: formValues.answer,
        position: formValues.position,
      };
      if (this.createForm) {
        this.store.dispatch(faqActions.addFaq({ faq: { ...newFaq } }));
      } else {
        this.store.dispatch(
          faqActions.editFaq({ faq: { ...newFaq, id: this.faq.id } })
        );
      }
    }
  }

  private getFaqToEditSubscription() {
    return this.store
      .select(faqSelectors.selectedFaq)
      .pipe(
        filter(data => !!data),
        tap((faq: FAQ) => {
          this.faqForm.patchValue({
            ...faq,
          });

          this.faq = faq;
          this.createForm = false;
          this.navigator.setPanelTitle('Update Faq');
        })
      )
      .subscribe();
  }
  private addOrEditSubscription() {
    return this.action$
      .pipe(
        ofType(faqActions.editFaqSuccessful, faqActions.addFaqSuccessful),
        tap(_ => {
          this.navigator.closeModal();
        })
      )
      .subscribe();
  }
}


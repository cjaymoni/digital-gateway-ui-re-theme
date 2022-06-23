import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, switchMap } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { DEFAULT_PAGE_SIZE, PrimeNgAlerts } from 'src/app/config/app-config';
import { AppAlertService } from 'src/app/shared-ui-modules/alerts/service/app-alert.service';
import { FaqsService } from 'src/app/pages/faqs/faqs.service';
import { faqActions } from '../actions/faq.actions';
import { FAQ } from 'src/app/models/faqs.model';

@Injectable()
export class FaqEffects {
  loadFaq$ = createEffect(() =>
    this.actions$.pipe(
      ofType(faqActions.fetch),
      switchMap(() =>
        this.faqService.getResources().pipe(
          map((faq: FAQ[]) =>
            faqActions.fetchSuccessful({
              faq,
            })
          ),
          catchError(error => {
            this.showError(error);
            return of(faqActions.fetchError);
          })
        )
      )
    )
  );

  searchFaq$ = createEffect(() =>
    this.actions$.pipe(
      ofType(faqActions.findAndSelectFaq),
      switchMap(({ searchParams }) =>
        this.faqService.searchFaq(searchParams).pipe(
          map((faq: FAQ[]) =>
            faqActions.selectFaq({
              faq: faq?.[0],
            })
          ),
          catchError(error => {
            this.showError(error);
            return of(faqActions.fetchError);
          })
        )
      )
    )
  );

  searchDigitalLinkById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(faqActions.findAndSelectFaqById),
      switchMap(({ id }) =>
        this.faqService.getOneResource(id).pipe(
          tap(faq => {
            this.store.dispatch(faqActions.selectFaqToEdit({ faq }));
          }),
          map((faq: FAQ) =>
            faqActions.selectFaq({
              faq,
            })
          ),
          catchError(error => {
            this.showError(error);
            return of(faqActions.fetchError);
          })
        )
      )
    )
  );

  addFaq$ = createEffect(() =>
    this.actions$.pipe(
      ofType(faqActions.addFaq),
      switchMap(({ faq }) =>
        this.faqService.addQuestion(faq).pipe(
          map((savedFaq: any) =>
            faqActions.addFaqSuccessful({
              faq: savedFaq,
            })
          ),
          tap(saved => this.showToast('Faq Saved Successfully')),
          catchError(error => {
            this.showError(error);
            return of(faqActions.fetchError);
          })
        )
      )
    )
  );

  editFaq$ = createEffect(() =>
    this.actions$.pipe(
      ofType(faqActions.editFaq),
      switchMap(({ faq }) =>
        this.faqService.editQuestion(faq).pipe(
          map((updatedFaq: any) =>
            faqActions.editFaqSuccessful({
              updatedFaq: {
                changes: updatedFaq,
                id: updatedFaq.id,
              },
            })
          ),
          tap(saved => this.showToast('Faq Edited Successfully')),
          catchError(error => {
            this.showError(error);
            return of(faqActions.fetchError);
          })
        )
      )
    )
  );

  private showToast(message: string) {
    this.alert.showToast(message, PrimeNgAlerts.UNOBSTRUSIVE);
  }

  private showError(error: any) {
    this.alert.showToast(
      'An error occurred. Rest assured we will fix it',
      PrimeNgAlerts.ERROR
    );
  }

  constructor(
    private actions$: Actions,
    private faqService: FaqsService,
    private alert: AppAlertService,
    private store: Store
  ) {}
}


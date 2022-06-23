import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { faqActions } from 'src/app/store/actions/faq.actions';
import { faqSelectors } from 'src/app/store/selectors/faq.selectors';
import { FaqsService } from 'src/app/pages/faqs/faqs.service';
import { AppAlertService } from 'src/app/shared-ui-modules/alerts/service/app-alert.service';

@Component({
  selector: 'app-faq-settings',
  templateUrl: './faq-settings.component.html',
  styleUrls: ['./faq-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqSettingsComponent implements OnInit {
  unselectedFaqs$ = this.store.select(faqSelectors.all);
  selectedArray: any[] = [];

  constructor(
    private store: Store,
    private faqService: FaqsService,
    private alert: AppAlertService
  ) {}

  ngOnInit() {
    this.fetchFaqs();
  }

  fetchFaqs() {
    this.store.dispatch(faqActions.fetch());
  }
  assignNewPositionNumber(event: any) {
    this.unselectedFaqs$
      .pipe(
        map(array => {
          const newArray = [...array];
          newArray.map((element, index) => {
            this.selectedArray.push({ ...element, position: index + 1 });
          });
          return this.selectedArray;
        })
      )
      .subscribe();
  }

  saveChanges() {
    var data: any[] = [];
    this.selectedArray.forEach(element => {
      data.push({ id: element.id, position: element.position });
    });
    this.faqService
      .editPosition(data)
      .subscribe(_ => this.alert.showToast('Faq Positions Saved Successfully'));
  }
}


import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { RouterOutlets } from 'src/app/config/app-config';
import { FAQ } from 'src/app/models/faqs.model';
import { NavigatorService } from 'src/app/services/navigator.service';
import { faqActions } from 'src/app/store/actions/faq.actions';
import { faqSelectors } from 'src/app/store/selectors/faq.selectors';

@Component({
  selector: 'app-faq-list',
  templateUrl: './faq-list.component.html',
  styleUrls: ['./faq-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqListComponent implements OnInit {
  faqsList$ = this.store.select(faqSelectors.all);

  columns: any[] = [];

  constructor(
    private title: Title,
    private navigator: NavigatorService,
    private store: Store
  ) {}

  ngAfterViewInit(): void {
    this.fetchFaqs();
    this.columns = [
      {
        header: 'Question',
        field: 'question',
      },
      {
        header: 'Answer',
        field: 'answer',
      },
    ];
  }
  ngOnInit() {
    this.title.setTitle('Faqs');
  }
  fetchFaqs() {
    this.store.dispatch(faqActions.fetch());
  }
  goToAddNewFaq() {
    this.navigator.faqs.goToAddPage(RouterOutlets.Modal);
  }

  editFaq(faq: FAQ) {
    this.navigator.faqs.goToEditPage(faq.id, 'Edit Faq', RouterOutlets.Modal);
  }
  viewFaq(faq: FAQ) {
    this.navigator.faqs.goToViewPage(faq.id, 'View Faq', RouterOutlets.Modal);
  }
}


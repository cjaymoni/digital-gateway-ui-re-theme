import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject, finalize, pipe, tap } from 'rxjs';
import { FAQ } from 'src/app/models/faqs.model';
import { FaqsService } from '../faqs.service';

@Component({
  selector: 'app-faqs-view',
  templateUrl: './faqs-view.component.html',
  styleUrls: ['./faqs-view.component.scss'],
})
export class FaqsViewComponent implements OnInit {
  questions: FAQ[] = [];

  constructor(
    private readonly faqService: FaqsService,
    public sanitizer: DomSanitizer
  ) {}

  loading$ = new BehaviorSubject(true);

  ngOnInit() {
    this.faqService
      .getQuestions()
      .pipe(finalize(() => this.loading$.next(false)))
      .subscribe(questions => (this.questions = questions));
  }
}


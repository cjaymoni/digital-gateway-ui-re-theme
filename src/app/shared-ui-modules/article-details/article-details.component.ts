import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { filter, map, take } from 'rxjs';
import { SeoService } from 'src/app/helpers/seo.service';
import { GoogleAnalyticsService } from 'src/app/services/google-analytics.service';
import { articleSelectors } from 'src/app/store/selectors/article.selectors';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleDetailsComponent implements OnInit, AfterViewInit {
  constructor(
    private store: Store,
    public sanitizer: DomSanitizer,
    private seo: SeoService,
    private gtag: GoogleAnalyticsService
  ) {}

  @Input() article$ = this.store.select(articleSelectors.selectedArticle).pipe(
    filter(article => !!article),
    take(1),
    map(article => {
      this.seo.generateTags({
        title: article.title,
        image: article.images?.[0]?.image || '',
        description: article.meta_description,
        author: article.meta_author,
      });

      return article;
    })
  );

  loading$ = this.store.select(articleSelectors.loading);

  ngOnInit() {}

  ngAfterViewInit() {
    this.article$
      .pipe(
        filter(d => !!d),
        take(1)
      )
      .subscribe(article => {
        this.gtag.Pages.articleOpened(article);
      });
  }
}

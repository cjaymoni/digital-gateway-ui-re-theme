import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { filter } from 'rxjs';
import { SeoService } from 'src/app/helpers/seo.service';
import { Article } from 'src/app/models/article.model';
import { GoogleAnalyticsService } from 'src/app/services/google-analytics.service';
import { NavigatorService } from 'src/app/services/navigator.service';
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
    private gtag: GoogleAnalyticsService,
    private readonly navigator: NavigatorService
  ) {}

  @Input() article$ = this.store.select(articleSelectors.selectedArticle);

  loading$ = this.store.select(articleSelectors.loading);

  ngOnInit() {}

  ngAfterViewInit() {
    this.article$.pipe(filter(d => !!d)).subscribe((article: Article) => {
      if (article) {
        this.gtag.Pages.articleOpened(article);
        this.setBreadCrumbs(article);
        this.seo.generateTags({
          title: article.title,
          image: article.images?.[0]?.image || '',
          description: article.meta_description,
          author: article.meta_author,
        });
      }
    });
  }

  setBreadCrumbs(article: Article) {
    if (article && article.title) {
      const breadcrumbs: MenuItem[] = [];
      breadcrumbs.push(
        ...[
          {
            label: 'Articles',
            routerLink: '/articles',
          },
          {
            label: article.category?.name,
            routerLink: ['/articles', 'search', article.category?.slug],
          },
          {
            label: article.title,
            routerLink: ['/articles', article.slug],
          },
        ]
      );
      this.navigator.breadCrumbs$.next(breadcrumbs);
      // this.cdref.detectChanges();
    }
  }
}


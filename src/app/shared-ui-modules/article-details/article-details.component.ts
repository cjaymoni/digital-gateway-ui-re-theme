import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { filter, take, tap } from 'rxjs';
import { SeoService } from 'src/app/helpers/seo.service';
import { articleSelectors } from 'src/app/store/selectors/article.selectors';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleDetailsComponent implements OnInit {
  constructor(
    private store: Store,
    public sanitizer: DomSanitizer,
    private seo: SeoService
  ) {}

  @Input() article$ = this.store.select(articleSelectors.selectedArticle).pipe(
    filter(article => !!article),
    take(1),
    tap(article => {
      this.seo.generateTags({
        title: article.title,
        image: article.images?.[0].image,
        description: article.meta_description,
        author: article.meta_author,
      });
    })
  );

  loading$ = this.store.select(articleSelectors.loading);

  ngOnInit() {}
}

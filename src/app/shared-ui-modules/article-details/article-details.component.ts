import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { filter, tap } from 'rxjs';
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
    private title: Title
  ) {}

  @Input() article$ = this.store.select(articleSelectors.selectedArticle).pipe(
    filter(article => !!article),
    tap(article => this.title.setTitle(article.title))
  );

  ngOnInit() {}
}

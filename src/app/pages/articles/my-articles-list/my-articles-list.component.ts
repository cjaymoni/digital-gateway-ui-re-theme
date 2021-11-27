import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { Pages, PublishedStatusMapping } from 'src/app/config/app-config';
import { Article } from 'src/app/models/article.model';
import { NavigatorService } from 'src/app/services/navigator.service';
import { articleActions } from 'src/app/store/actions/article.actions';
import { articleSelectors } from 'src/app/store/selectors/article.selectors';

@Component({
  selector: 'app-my-articles-list',
  templateUrl: './my-articles-list.component.html',
  styleUrls: ['./my-articles-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyArticlesListComponent implements OnInit, AfterViewInit {
  myArticles$ = this.store.select(articleSelectors.all);

  @ViewChild('statusTemplate') statusTemplate: TemplateRef<any> | undefined =
    undefined;

  @ViewChild('tagsTemplate') tagsTemplate: TemplateRef<any> | undefined =
    undefined;

  columns: any[] = [];

  PublishedStatusMapping = PublishedStatusMapping;

  constructor(
    private store: Store,
    private navigator: NavigatorService,
    private title: Title
  ) {}

  ngAfterViewInit(): void {
    this.columns = [
      { header: 'TITLE', field: 'title' },
      { header: 'CATEGORY', field: 'category', subField: 'name' },
      { header: 'TAGS', field: 'tags', template: this.tagsTemplate },
      { header: 'STATUS', field: 'status', template: this.statusTemplate },
      { header: 'CREATED_BY', field: 'created_by', subField: 'username' },
    ];
  }

  ngOnInit(): void {
    this.title.setTitle('My Articles');
  }

  viewArticle(article: Article) {
    this.selectArticle(article);
    this.navigator.openPanel(Pages.view);
  }

  editArticle(article: Article) {
    this.store.dispatch(
      articleActions.selectArticleToEdit({
        article,
      })
    );
    this.navigator.openPanel(Pages.edit);
  }

  goToAddArticlePage() {
    this.navigator.article.goToAddPage();
  }

  private selectArticle(article: Article) {
    this.store.dispatch(
      articleActions.selectArticle({
        article,
      })
    );
  }
}

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
import {
  PublishedStatusMapping,
  RouterOutlets,
} from 'src/app/config/app-config';
import { Article } from 'src/app/models/article.model';
import { NavigatorService } from 'src/app/services/navigator.service';
import { articleSelectors } from 'src/app/store/selectors/article.selectors';
import { MenuItem } from 'primeng/api';
import { ArticleService } from '../services/articles.service';
import { AppAlertService } from 'src/app/shared-ui-modules/alerts/service/app-alert.service';
import { PrimeNgAlerts } from 'src/app/config/app-config';
import { articleActions } from 'src/app/store/actions/article.actions';

@Component({
  selector: 'app-my-articles-list',
  templateUrl: './my-articles-list.component.html',
  styleUrls: ['./my-articles-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyArticlesListComponent implements OnInit, AfterViewInit {
  myArticles$ = this.store.select(articleSelectors.myArticles);
  count$ = this.store.select(articleSelectors.searchCount);

  @ViewChild('statusTemplate') statusTemplate: TemplateRef<any> | undefined =
    undefined;

  @ViewChild('tagsTemplate') tagsTemplate: TemplateRef<any> | undefined =
    undefined;

  columns: any[] = [];
  statusList!: MenuItem[];
  selectedArticle: any;
  selectedStatus!: string;
  PublishedStatusMapping = PublishedStatusMapping;

  constructor(
    private store: Store,
    private navigator: NavigatorService,
    private title: Title,
    private articleService: ArticleService,
    private appAlertService: AppAlertService
  ) {
    this.fetchData();
  }

  fetchData = () => {
    this.store.dispatch(articleActions.fetchMyArticles());
  };

  ngAfterViewInit(): void {
    this.columns = [
      { header: 'TITLE', field: 'title' },
      { header: 'CATEGORY', field: 'category', subField: 'name' },
      { header: 'TAGS', field: 'tags', template: this.tagsTemplate },
      { header: 'STATUS', field: 'status', template: this.statusTemplate },
      { header: 'CREATED_BY', field: 'created_by', subField: 'email' },
    ];
  }

  ngOnInit(): void {
    this.title.setTitle('My Articles');

    this.statusList = [
      {
        id: 'Review',
        label: 'Review',
        command: e => {
          this.selectedStatus = e.item['id'];
          this.editStatus();
        },
      },

      {
        id: 'Ready',
        label: 'Ready',
        command: e => {
          this.selectedStatus = e.item['id'];
          this.editStatus();
        },
      },
      {
        id: 'Published',
        label: 'Published',
        command: e => {
          this.selectedStatus = e.item['id'];
          this.editStatus();
        },
      },
      {
        id: 'Archived',
        label: 'Archived',
        command: e => {
          this.selectedStatus = e.item['id'];
          this.editStatus();
        },
      },
    ];
  }

  viewArticle(article: Article) {
    this.navigator.article.goToViewPage(
      article.id,
      'Preview Article',
      RouterOutlets.Modal
    );
  }

  editArticle(article: Article) {
    this.navigator.article.goToEditPage(
      article.id,
      'Edit Article',
      RouterOutlets.Modal
    );
  }

  goToAddArticlePage() {
    this.navigator.article.goToAddPage(RouterOutlets.Modal);
  }

  editStatus() {
    const formData = {
      status: this.selectedStatus,
    };
    const articleId = this.selectedArticle.id;

    this.articleService
      .editArticleStatus(`${articleId}`, formData)
      .subscribe((data: any) => {
        this.appAlertService.showToast(
          `${data.title} status updated successfully`,
          PrimeNgAlerts.UNOBSTRUSIVE
        );
      });
  }

  changePage(event: any) {
    this.store.dispatch(
      articleActions.changeSearchPage({
        searchPage: event.page + 1,
      })
    );
  }
}

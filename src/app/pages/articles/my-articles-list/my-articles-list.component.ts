import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import {
  PrimeNgAlerts,
  PublishedStatusMapping,
  RouterOutlets,
} from 'src/app/config/app-config';
import { Article } from 'src/app/models/article.model';
import { NavigatorService } from 'src/app/services/navigator.service';
import { AppAlertService } from 'src/app/shared-ui-modules/alerts/service/app-alert.service';
import { articleActions } from 'src/app/store/actions/article.actions';
import { articleSelectors } from 'src/app/store/selectors/article.selectors';
import { ArticleService } from '../services/articles.service';

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

  @ViewChild('createdOnTemplate') createdOnTemplate:
    | TemplateRef<any>
    | undefined = undefined;

  @ViewChild('fullnameTemplate') fullnameTemplate:
    | TemplateRef<any>
    | undefined = undefined;

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
    private appAlertService: AppAlertService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  fetchData = () => {
    this.store.dispatch(articleActions.fetchMyArticles());
  };

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.fetchData();
    }

    this.columns = [
      { header: 'TITLE', field: 'title', sortable: true },
      {
        header: 'CATEGORY',
        field: 'category',
        subField: 'name',
      },
      { header: 'TAGS', field: 'tags', template: this.tagsTemplate },
      {
        header: 'STATUS',
        field: 'status',
        template: this.statusTemplate,
        sortable: true,
      },
      {
        header: 'CREATED_BY',
        field: 'created_by',
        template: this.fullnameTemplate,
      },
      {
        header: 'CREATED_ON',
        field: 'created_on',
        sortable: true,
        template: this.createdOnTemplate,
      },
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

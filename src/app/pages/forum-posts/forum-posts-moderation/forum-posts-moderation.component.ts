import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MenuItem } from 'primeng/api';

import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { forumPostSelectors } from 'src/app/store/selectors/forum-post.selectors';
import { ForumPostsService } from 'src/app/pages/forum-posts/services/forum-post.service';
import { AppAlertService } from 'src/app/shared-ui-modules/alerts/service/app-alert.service';
import { PrimeNgAlerts } from 'src/app/config/app-config';
@Component({
  selector: 'app-forum-posts-moderation',
  templateUrl: './forum-posts-moderation.component.html',
  styleUrls: ['./forum-posts-moderation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForumPostsModerationComponent implements OnInit, AfterViewInit {
  @ViewChild('statusTemplate')
  statusTemplate!: TemplateRef<any>;

  forumPosts$ = this.store.select(forumPostSelectors.all);

  columns: any[] = [];

  activeStatusList!: MenuItem[];

  blacklistStatusList!: MenuItem[];

  selectedActiveStatus!: string;

  selectedBlacklistStatus!: string;

  selectedForumPost: any;

  constructor(
    private store: Store,
    private title: Title,
    private forumPostService: ForumPostsService,
    private appAlertService: AppAlertService
  ) {}

  ngAfterViewInit(): void {
    this.columns = [
      { header: 'TITLE', field: 'title' },
      { header: 'COMMENTS', field: 'comment_count' },

      { header: 'SCORE', field: 'score' },
      { header: 'SUBMITTER', field: 'submitter', subField: 'email' },
      { header: 'ACTIVE', field: 'is_active', template: this.statusTemplate },
      {
        header: 'BLACKLISTED',
        field: 'is_blacklisted',
        template: this.statusTemplate,
      },
    ];

    this.activeStatusList = [
      {
        id: 'true',
        label: 'Active',
        command: e => {
          this.selectedActiveStatus = e.item['id'];
          this.editActiveStatus();
        },
      },
      {
        id: 'false',
        label: 'InActive',
        command: e => {
          this.selectedActiveStatus = e.item['id'];
          this.editActiveStatus();
        },
      },
    ];

    this.blacklistStatusList = [
      {
        id: 'true',
        label: 'Blacklist',
        command: e => {
          this.selectedBlacklistStatus = e.item['id'];
          this.editBlacklistStatus();
        },
      },
      {
        id: 'false',
        label: 'Whitelist',
        command: e => {
          this.selectedBlacklistStatus = e.item['id'];
          this.editBlacklistStatus();
        },
      },
    ];
  }

  ngOnInit() {
    this.title.setTitle('Forum Posts');
  }

  editActiveStatus() {
    const formData = {
      is_active: this.selectedActiveStatus,
    };
    const postId = this.selectedForumPost.id;
    this.forumPostService
      .editForumPostStatus(formData, postId)
      .subscribe((data: any) => {
        this.appAlertService.showToast(
          `${data.title} status updated successfully`,
          PrimeNgAlerts.UNOBSTRUSIVE
        );
      });
  }

  editBlacklistStatus() {
    const formData = {
      is_blacklisted: this.selectedBlacklistStatus,
    };
    const postId = this.selectedForumPost.id;
    this.forumPostService
      .editForumPostStatus(formData, postId)
      .subscribe((data: any) => {
        this.appAlertService.showToast(
          `${data.title} status updated successfully`,
          PrimeNgAlerts.UNOBSTRUSIVE
        );
      });
  }
}

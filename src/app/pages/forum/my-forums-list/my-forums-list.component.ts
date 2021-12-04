import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  TemplateRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { NavigatorService } from 'src/app/services/navigator.service';
import { forumActions } from 'src/app/store/actions/forum.actions';
import { forumSelectors } from '../../../store/selectors/forum.selectors';
import { Forum } from '../../../models/forum.model';
import { Pages } from 'src/app/config/app-config';

@Component({
  selector: 'app-my-forums-list',
  templateUrl: './my-forums-list.component.html',
  styleUrls: ['./my-forums-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyForumsListComponent implements OnInit, AfterViewInit {
  myForums$ = this.store.select(forumSelectors.all);

  @ViewChild('tagsTemplate') tagsTemplate: TemplateRef<any> | undefined =
    undefined;

  columns: any[] = [];

  constructor(
    private store: Store,
    private navigator: NavigatorService,
    private title: Title
  ) {}

  ngAfterViewInit(): void {
    this.columns = [
      { header: 'TITLE', field: 'name' },
      { header: 'TAGS', field: 'tags', template: this.tagsTemplate },
    ];
  }
  ngOnInit() {
    this.title.setTitle('My Forums');
  }

  goToAddForumPage() {
    this.navigator.forum.goToAddPage();
  }

  viewForum(forum: Forum) {
    this.selectForum(forum);
    this.navigator.forum.goToViewPage(forum.id, 'Preview Forum');
  }

  editForum(forum: Forum) {
    this.store.dispatch(
      forumActions.selectForumToEdit({
        forum,
      })
    );
    this.navigator.forum.goToEditPage(forum.id, 'Edit Forum');
  }

  private selectForum(forum: Forum) {
    this.store.dispatch(
      forumActions.selectForum({
        forum,
      })
    );
  }
}

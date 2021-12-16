import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, map, Subscription, tap } from 'rxjs';
import { slugify } from 'src/app/helpers/app.helper.functions';
import { Forum } from 'src/app/models/forum.model';
import { NavigatorService } from 'src/app/services/navigator.service';
import { ImageUploadComponent } from '../image-upload/image-upload.component';
import { forumActions } from '../../store/actions/forum.actions';
import { forumSelectors } from '../../store/selectors/forum.selectors';
import { Tag } from 'src/app/models/tag.model';
import { TagType } from 'src/app/config/app-config';

@Component({
  selector: 'app-forum-form',
  templateUrl: './forum-form.component.html',
  styleUrls: ['./forum-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForumFormComponent implements OnInit, OnDestroy {
  forumForm!: FormGroup;

  oldTitle = '';

  subscription!: Subscription;

  createForm = true;

  forum!: Forum;

  forumTagType = TagType.forum;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private title: Title,
    private actions$: Actions,
    private navigator: NavigatorService
  ) {}

  ngOnDestroy(): void {
    this.title.setTitle(this.oldTitle);
    this.subscription.unsubscribe();
    this.store.dispatch(forumActions.clearAllSelected());
  }
  ngOnInit() {
    this.forumForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', Validators.required],
      tags: [''],
      coverImage: [],
    });

    this.oldTitle = this.title.getTitle();
    this.title.setTitle(this.createForm ? 'Add' : 'Update' + ' Forum');
    this.subscription = this.getForumToEditSubscription();
    this.subscription.add(this.addOrEditSuccessSubscription());
  }

  get tags() {
    return this.forumForm.get('tags') as FormControl;
  }

  get forumHasImage() {
    return this.coverImage.value?.[0]?.coverImage;
  }

  get coverImage() {
    return this.forumForm.get('coverImage') as FormControl;
  }

  removeImage() {
    this.coverImage.setValue([]);
  }
  onAddOrUpdateForum() {
    if (this.forumForm.valid) {
      const forum = this.forumForm.value;
      const toSend = {
        name: forum.name,
        description: forum.description,
        tags: (forum.tags || [])?.map((tag: Tag) => tag.id),
        created_by: 1,
        moderators: [1],
      };

      if (this.createForm) {
        this.store.dispatch(
          forumActions.addForum({
            forum: toSend,
          })
        );
      } else {
        this.store.dispatch(
          forumActions.editForum({
            forum: { ...toSend, id: this.forum.id },
          })
        );
      }
    }
  }

  private addOrEditSuccessSubscription() {
    return this.actions$
      .pipe(
        ofType(
          forumActions.addForumSuccessful,
          forumActions.editForumSuccessful
        ),
        map(_ => {
          this.navigator.forum.go();
        })
      )
      .subscribe();
  }

  private getForumToEditSubscription() {
    return this.store
      .select(forumSelectors.selectedForumToEdit)
      .pipe(
        filter(data => !!data),
        tap((forum: Forum) => {
          this.createForm = false;
          this.forum = forum;
          this.forumForm.patchValue(forum);
          this.navigator.setPanelTitle('Edit Forum');
        })
      )
      .subscribe();
  }

  goBack() {
    this.navigator.goBack();
  }
}

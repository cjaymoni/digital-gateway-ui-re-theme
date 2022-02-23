import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
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
import { filter, map, Subscription, take, tap } from 'rxjs';
import { NavigatorService } from 'src/app/services/navigator.service';
import { forumSelectors } from 'src/app/store/selectors/forum.selectors';
import { ForumPost } from '../../models/forum.model';
import { forumPostActions } from '../../store/actions/forum-post.action';
import { forumPostSelectors } from '../../store/selectors/forum-post.selectors';
import { ImageUploadComponent } from '../image-upload/image-upload.component';

@Component({
  selector: 'app-forum-post-form',
  templateUrl: './forum-post-form.component.html',
  styleUrls: ['./forum-post-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForumPostFormComponent implements OnInit, OnDestroy {
  @ViewChild('imageUpload')
  imageUpload!: ImageUploadComponent;

  forumPostForm!: FormGroup;

  oldTitle = '';

  subscription!: Subscription;

  createForm = true;

  forumPost!: ForumPost;

  selectedForum$ = this.store.select(forumSelectors.selectedForum).pipe(
    filter(d => !!d),
    take(1),
    tap(selected => this.forumPostForm?.get('forum')?.patchValue(selected))
  );

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
    this.store.dispatch(forumPostActions.clearAllSelected());
  }
  ngOnInit() {
    this.forumPostForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(160)]],
      content: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(160)]],
      forum: [''],
    });
    this.oldTitle = this.title.getTitle();
    this.title.setTitle(this.createForm ? 'Add' : 'Update' + ' Forum Post');
    this.subscription = this.getForumPostToEditSubscription();
    this.subscription.add(this.addOrEditSuccessSubscription());
  }
  get content() {
    return this.forumPostForm.get('content') as FormControl;
  }

  get forum() {
    return this.forumPostForm.get('forum') as FormControl;
  }

  onAddOrUpdateForumPost() {
    if (this.forumPostForm.valid) {
      const forumPost = this.forumPostForm.value;
      const images = (forumPost.images || []).concat(
        this.imageUpload.getFilesToUpload() || []
      );
      const toSend = {
        title: forumPost.title,
        content: forumPost.content,
        forums: [forumPost.forum.id],
        submitter: 1,
      };

      if (this.createForm) {
        this.store.dispatch(
          forumPostActions.addForumPost({
            forumPost: toSend,
            imageToUpload: images,
          })
        );
      } else {
        this.store.dispatch(
          forumPostActions.editForumPost({
            forumPost: { ...toSend, id: this.forumPost.id },
            imageToUpload: images,
          })
        );
      }
    }
  }

  private addOrEditSuccessSubscription() {
    return this.actions$
      .pipe(
        ofType(
          forumPostActions.addForumPostSuccessful,
          forumPostActions.editForumPostSuccessful
        ),
        map(_ => {
          this.navigator.forum.go();
        })
      )
      .subscribe();
  }

  private getForumPostToEditSubscription() {
    return this.store
      .select(forumPostSelectors.selectedForumPost)
      .pipe(
        filter(data => !!data),
        tap((forumPost: ForumPost) => {
          this.createForm = false;
          this.forumPost = forumPost;
          this.forumPostForm.patchValue(forumPost);
        })
      )
      .subscribe();
  }

  goBack() {
    this.navigator.forum.go();
  }
}

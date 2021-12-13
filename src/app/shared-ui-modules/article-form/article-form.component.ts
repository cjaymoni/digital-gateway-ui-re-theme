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
import { Article } from 'src/app/models/article.model';
import { Tag } from 'src/app/models/tag.model';
import { NavigatorService } from 'src/app/services/navigator.service';
import { articleActions } from 'src/app/store/actions/article.actions';
import { articleSelectors } from 'src/app/store/selectors/article.selectors';
import { AppQuillComponent } from '../app-quill/app-quill.component';
import { ImageUploadComponent } from '../image-upload/image-upload.component';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleFormComponent implements OnInit, OnDestroy {
  @ViewChild('contentBox', { static: true })
  contentInput: AppQuillComponent | null = null;

  @ViewChild('imageUpload', { static: false })
  imageUploadComponent!: ImageUploadComponent;

  articleForm!: FormGroup;

  oldTitle = '';

  subscription!: Subscription;

  createForm = true;

  article!: Article;

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
    this.store.dispatch(articleActions.clearAllSelected());
  }

  ngOnInit() {
    this.articleForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', Validators.required],
      category: ['', [Validators.required]],
      tags: [''],
      images: [],
    });

    this.oldTitle = this.title.getTitle();
    this.title.setTitle(this.createForm ? 'Add' : 'Update' + ' Article');
    this.subscription = this.getArticleToEditSubscription();
    this.subscription.add(this.addOrEditSuccessSubscription());
  }

  onAddOrUpdateArticle() {
    if (this.articleForm.valid) {
      const article = this.articleForm.value;
      const toSend = {
        title: article.title,
        content: article.content,
        category: article.category.id,
        tags: (article.tags as Tag[]).map(tag => tag.id),
        slug: slugify(article.title),
        created_by: 1,
      };

      const images: any = (this.images.value || []).concat(
        this.imageUploadComponent?.getFilesToUpload() || []
      );

      if (this.createForm) {
        this.store.dispatch(
          articleActions.addArticle({
            article: toSend,
            imageToUpload: images,
          })
        );
      } else {
        this.store.dispatch(
          articleActions.editArticle({
            article: { ...toSend, id: this.article.id },
            imageToUpload: images,
          })
        );
      }
    }
  }

  get tags() {
    return this.articleForm.get('tags') as FormControl;
  }

  get category() {
    return this.articleForm.get('category') as FormControl;
  }

  get content() {
    return this.articleForm.get('content') as FormControl;
  }

  get images() {
    return this.articleForm.get('images') as FormControl;
  }

  get articleHasImage() {
    return this.images.value?.[0]?.image;
  }

  removeImage() {
    this.images.setValue([]);
  }

  private addOrEditSuccessSubscription() {
    return this.actions$
      .pipe(
        ofType(
          articleActions.addArticleSuccessful,
          articleActions.editArticleSuccessful
        ),
        map(_ => {
          this.navigator.closeModal();
        })
      )
      .subscribe();
  }

  private getArticleToEditSubscription() {
    return this.store
      .select(articleSelectors.selectedArticleToEdit)
      .pipe(
        filter(data => !!data),
        tap((article: Article) => {
          this.createForm = false;
          this.article = article;
          this.articleForm.patchValue(article);
          this.navigator.setPanelTitle('Update Article');
        })
      )
      .subscribe();
  }

  goBack() {
    this.navigator.article.goToListPage();
  }
}

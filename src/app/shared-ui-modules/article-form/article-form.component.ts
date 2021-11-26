import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { slugify } from 'src/app/helpers/app.helper.functions';
import { articleActions } from 'src/app/store/actions/article.actions';
import { AppQuillComponent } from '../app-quill/app-quill.component';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleFormComponent implements OnInit, OnDestroy {
  @ViewChild('contentBox', { static: true })
  contentInput: AppQuillComponent | null = null;

  articleForm!: FormGroup;

  oldTitle = '';

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private title: Title
  ) {}

  ngOnDestroy(): void {
    this.title.setTitle(this.oldTitle);
  }

  ngOnInit() {
    this.articleForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', Validators.required],
      categories: ['', [Validators.required]],
      tags: ['', [Validators.required]],
    });

    this.oldTitle = this.title.getTitle();
    this.title.setTitle('Add Or Update Article');
  }

  onAddOrUpdateArticle() {
    if (this.articleForm.valid) {
      const article = this.articleForm.value;
      this.store.dispatch(
        articleActions.addArticle({
          article: {
            title: article.title,
            content: article.content,
            category: article.categories?.[0],
            // tags: article.tags,
            slug: slugify(article.title),
            created_by: 1,
          },
        })
      );
    }
  }

  get tags() {
    return this.articleForm.get('tags') as FormControl;
  }

  get categories() {
    return this.articleForm.get('categories') as FormControl;
  }

  get content() {
    return this.articleForm.get('content') as FormControl;
  }
}

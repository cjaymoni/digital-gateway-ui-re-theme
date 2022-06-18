import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, take, tap } from 'rxjs';
import { trackById } from 'src/app/config/app-config';
import { Article } from 'src/app/models/article.model';
import { Category, CategoryPosition } from 'src/app/models/category.model';
import { ArticleService } from 'src/app/pages/articles/services/articles.service';
import { NavigatorService } from 'src/app/services/navigator.service';
import { categorySelectors } from 'src/app/store/selectors/category.selectors';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavComponent implements OnInit {
  constructor(
    private navigator: NavigatorService,
    private store: Store,
    private articleService: ArticleService
  ) {}

  showAll = false;

  // used to determine if we should close sidemenu or not
  // when we click outside of the sidemenu
  currentIndex = -1;
  currentSubcategoryIndex = -1;

  currentCategory!: Category | undefined | null;
  currentSubcategory!: Category | undefined | null;

  articlesLoading$ = new BehaviorSubject(false);

  trackById = trackById;

  // featuredCategory$ = this.themeSetting.featuredCategoryArray$;
  // featuredTags$ = this.store.select(tagSelectors.featuredArticleTags);
  categories$ = this.store.select(
    categorySelectors.getByPostion(CategoryPosition.LEFT)
  );

  loading$ = new BehaviorSubject(false);
  articles$: BehaviorSubject<Article[]> = new BehaviorSubject([] as Article[]);
  subCategories$: BehaviorSubject<Category[]> = new BehaviorSubject(
    [] as Category[]
  );

  displaySubCategories = false;
  displayArticles = false;

  selectedCategory!: Category | null | undefined;
  selectedSubCategory!: Category | null | undefined;

  ngOnInit(): void {}

  viewMore() {
    this.showAll = !this.showAll;
  }

  getRelatedArticles(category: Category, index: number) {
    this.selectedCategory = category;
    this.displaySubCategories = !this.displaySubCategories;

    if (this.currentIndex !== index) {
      this.displaySubCategories = true;
    }

    if (this.displaySubCategories) {
      this.currentIndex = index;
      this.currentCategory = category;
    }

    this.loading$.next(true);
    // this.articleService
    //   .searchArticle({
    //     tag: tag.id,
    //   })
    //   .pipe(
    //     take(1),
    //     map(articles => {
    //       this.loading$.next(false);
    //       this.articles$.next(articles);
    //     }),
    //     catchError(e => {
    //       this.loading$.next(false);
    //       return e;
    //     })
    //   )
    //   .subscribe();
  }

  readArticle(article: Article) {
    this.closeAll();

    this.navigator.article.goToViewDetailsPage(article.slug);
  }

  getArticles(category: Category, index: number) {
    this.selectedSubCategory = category;
    this.displayArticles = !this.displayArticles;

    if (this.currentSubcategoryIndex !== index) {
      this.displayArticles = true;
    }

    if (this.displayArticles) {
      this.currentSubcategoryIndex = index;
      this.currentSubcategory = category;
    }
    if (category && category.id) {
      this.articlesLoading$.next(true);

      this.articleService
        .searchArticleByCategory(category.id)
        .pipe(take(1))
        .subscribe(articles => {
          this.articlesLoading$.next(false);
          this.articles$.next(articles);
        });
    }
  }

  getSubCategories(category: Category | undefined, index: number) {
    this.selectedCategory = category;
    this.displaySubCategories = !this.displaySubCategories;

    if (this.currentIndex !== index) {
      this.displaySubCategories = true;
    }

    if (this.displaySubCategories) {
      this.currentIndex = index;
      this.currentCategory = category;
    }

    this.loading$.next(true);
    if (category && category.id) {
      this.store
        .select(categorySelectors.getById(category.id))
        .pipe(take(1))
        .subscribe(categories => {
          this.subCategories$.next(categories?.subcategories);
          this.loading$.next(false);
        });
    }
  }

  clickOutsidePanel(event: Event) {
    event.stopPropagation();
    if (this.displaySubCategories) {
      this.displaySubCategories = false;
    }
  }

  closeAll() {
    this.selectedCategory = null;
    this.selectedSubCategory = null;
    this.displayArticles = false;
    this.displaySubCategories = false;
  }

  goToFaqs() {
    this.navigator.goToRoute(['search', 'faqs']);
  }
}


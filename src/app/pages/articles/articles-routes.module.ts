import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSegment } from '@angular/router';
import { SLUG_PREFIX } from 'src/app/config/app-config';
import { TestComponentComponent } from 'src/app/test/test-component/test-component.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleGuard } from './guard/article.guard';

export function slugMatcher(url: UrlSegment[]) {
  return url[0]?.path.startsWith(SLUG_PREFIX) ? { consumed: url } : null;
}

const routes: Routes = [
  {
    path: '',
    component: ArticleListComponent,
    canActivate: [ArticleGuard],
  },
  {
    matcher: slugMatcher,
    component: TestComponentComponent,
    data: { fetch: true },
    canActivate: [ArticleGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticleRoutesModule {}

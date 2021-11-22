import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterOutlets } from './config/app-config';
import { LayoutComponent } from './shared-ui-modules/layout/layout.component';
import { TestComponentComponent } from './test/test-component/test-component.component';
import { ArticleDetailsComponent } from './pages/articles/article-details/article-details.component';

const routes: Routes = [
  {
    path: 'comments',
    component: TestComponentComponent,
    outlet: RouterOutlets.Right,
  },
  {
    path: 'articles' ,
    component: ArticleDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pages, RouterOutlets } from './config/app-config';
import { LayoutComponent } from './shared-ui-modules/layout/layout.component';
import { TestComponentComponent } from './test/test-component/test-component.component';

const routes: Routes = [
  {
    path: 'comments',
    component: TestComponentComponent,
    outlet: RouterOutlets.Right,
  },
  {
    path: Pages.Articles,
    loadChildren: () =>
      import('./pages/articles/articles.module').then(
        module => module.ArticlesModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

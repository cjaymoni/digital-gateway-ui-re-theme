import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pages } from './config/app-config';

const routes: Routes = [
  {
    path: Pages.Articles,
    loadChildren: () =>
      import('./pages/articles/articles.module').then(
        module => module.ArticlesModule
      ),
  },
  {
    path: Pages.Login,
    loadChildren: () =>
      import('./pages/login/login.module').then(
        module => module.LoginModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

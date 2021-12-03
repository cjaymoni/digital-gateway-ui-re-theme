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
    path: Pages.MarketPlace,
    loadChildren: () =>
      import('./pages/market-place/market-place.module').then(
        m => m.MarketPlaceModule
      ),
  },
  {
    path: Pages.Forum,
    loadChildren: () =>
      import('./pages/forum/forum.module').then(m => m.ForumModule),
  },
  {
    path: Pages.ForumPost,
    loadChildren: () =>
      import('./pages/forum-posts/forum-post.module').then(
        m => m.ForumPostModule
      ),
  },
  {
    path: Pages.ContentManagement,
    loadChildren: () =>
      import('./pages/content-management/content-management.module').then(
        m => m.ContentManagementModule
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

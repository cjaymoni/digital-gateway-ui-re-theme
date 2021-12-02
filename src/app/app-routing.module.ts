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
    path: 'market-place',
    loadChildren: () =>
      import('./pages/market-place/market-place.module').then(
        m => m.MarketPlaceModule
      ),
  },
  {
    path: 'forum',
    loadChildren: () =>
      import('./pages/forum/forum.module').then(m => m.ForumModule),
  },
  {
    path: 'forumPost',
    loadChildren: () =>
      import('./pages/forum-posts/forum-post.module').then(
        m => m.ForumPostModule
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

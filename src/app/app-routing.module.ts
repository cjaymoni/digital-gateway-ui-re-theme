import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pages } from './config/app-config';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/landing/landing.module').then(
        m => m.LandingModule
      ),
  },
  {
    path: Pages.Articles.main,
    loadChildren: () =>
      import('./pages/articles/articles.module').then(
        module => module.ArticlesModule
      ),
    data: {
      breadcrumb: 'Articles',
    },
  },
  {
    path: Pages.MarketPlace.main,
    loadChildren: () =>
      import('./pages/market-place/market-place.module').then(
        m => m.MarketPlaceModule
      ),
  },
  {
    path: Pages.Forum.main,
    loadChildren: () =>
      import('./pages/forum/forum.module').then(m => m.ForumModule),
    data: { breadcrumb: 'Forums' },
  },
  {
    path: Pages.ForumPost.main,
    loadChildren: () =>
      import('./pages/forum-posts/forum-post.module').then(
        m => m.ForumPostModule
      ),
    data: { breadcrumb: 'Forum Post' },
  },
  {
    path: Pages.ContentManagement,
    loadChildren: () =>
      import('./pages/content-management/content-management.module').then(
        m => m.ContentManagementModule
      ),
    data: { breadcrumb: 'Content Management' },
  },
  {
    path: Pages.SiteSettings,
    loadChildren: () =>
      import('./pages/app-settings/app-settings.module').then(
        m => m.AppSettingsModule
      ),
    data: { breadcrumb: 'Theme Settings' },
  },
  {
    path: Pages.Resources.main,
    loadChildren: () =>
      import('./pages/resource/resource.module').then(
        m => m.ResourceModule
      ),
  },
  {
    path: Pages.UserProfile,
    loadChildren: () =>
      import('./pages/user-profile/user-profile.module').then(
        m => m.UserProfileModule
      ),
  },
  {
    path: Pages.SignUp,
    loadChildren: () =>
      import('./pages/signup/signup.module').then(m => m.SignupModule),
  },
  {
    path: Pages.UserProfile,
    loadChildren: () =>
      import('./pages/user-profile/user-profile.module').then(
        m => m.UserProfileModule
      ),
  },
  {
    path: Pages.Auth.login,
    loadChildren: () =>
      import('./pages/login/login.module').then(m => m.LoginModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

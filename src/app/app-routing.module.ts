import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pages, RouterOutlets } from './config/app-config';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { SignupFormComponent } from './pages/signup/signup-form/signup-form.component';
import { RoleGuard } from './services/role.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/landing/landing.module').then(m => m.LandingModule),
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
    data: {
      breadcrumb: 'Market Place',
    },
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
    // canActivate: [RoleGuard],
  },
  {
    path: Pages.SiteSettings,
    loadChildren: () =>
      import('./pages/app-settings/app-settings.module').then(
        m => m.AppSettingsModule
      ),
    data: { breadcrumb: 'Theme Settings' },
    // canActivate: [RoleGuard],
  },
  {
    path: Pages.Resources.main,
    loadChildren: () =>
      import('./pages/resource/resource.module').then(m => m.ResourceModule),
  },
  {
    path: Pages.UserProfile,
    loadChildren: () =>
      import('./pages/user-profile/user-profile.module').then(
        m => m.UserProfileModule
      ),
    data: {
      breadcrumb: 'User Profile',
    },
  },
  {
    path: Pages.MultimediaManagement.main,
    loadChildren: () =>
      import('./pages/multimedia-management/multimedia-management.module').then(
        m => m.MultimediaManagementModule
      ),
    data: {
      breadcrumb: 'Multimedia Management',
    },
  },
  {
    path: Pages.DigitalLinks.main,
    loadChildren: () =>
      import('./pages/digital-links/digital-links.module').then(
        m => m.DigitalLinksModule
      ),
    data: {
      breadcrumb: 'Digital Links',
    },
  },
  {
    path: Pages.SignUp,
    component: SignupFormComponent,
    outlet: RouterOutlets.Right,
  },
  {
    path: Pages.UserManagement,
    loadChildren: () =>
      import('./pages/users-management/users-management.module').then(
        m => m.UsersManagementModule
      ),
    data: {
      breadcrumb: 'Users Management',
    },
  },
  {
    path: Pages.AboutUs,
    loadChildren: () =>
      import('./pages/about-us/about-us.module').then(m => m.AboutUsModule),
    data: {
      breadcrumb: 'About Us',
    },
  },
  {
    path: 'search/:query',
    pathMatch: 'full',
    component: SearchResultsComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

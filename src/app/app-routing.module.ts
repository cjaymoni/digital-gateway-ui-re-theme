import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pages, RouterOutlets } from './config/app-config';
import { ConfirmEmailComponent } from './pages/confirm-email/confirm-email.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { SignupFormComponent } from './pages/signup/signup-form/signup-form.component';

const routes: Routes = [
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '',
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
    path: Pages.SiteSettings.main,
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
    data: { breadcrumb: 'Resources' },
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
      breadcrumb: 'Direct Links',
    },
  },
  {
    path: Pages.SignUp,
    component: SignupFormComponent,
    outlet: RouterOutlets.Right,
  },
  {
    path: Pages.UserManagement.main,
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
    path: Pages.Partners.main,
    loadChildren: () =>
      import('./pages/partners/partners.module').then(m => m.PartnersModule),
    data: {
      breadcrumb: 'Partners',
    },
  },
  {
    path: 'verify-email',
    component: ConfirmEmailComponent,
  },
  {
    path: 'contact-us',
    loadChildren: () =>
      import('./pages/contact-us/contact-us.module').then(
        m => m.ContactUsModule
      ),
    data: {
      breadcrumb: 'Contact Us',
    },
  },
  {
    path: Pages.Faqs.main,
    loadChildren: () =>
      import('./pages/faqs/faqs.module').then(m => m.FaqsModule),
    data: {
      breadcrumb: 'FAQs',
    },
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


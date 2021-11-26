import { NgModule } from '@angular/core';
import { RouterOutlets, SLUG_PREFIX } from 'src/app/config/app-config';
import { Router, RouterModule, Routes, UrlSegment } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';

// export function slugMatcher(url: UrlSegment[]) {
//   return url[0]?.path.startsWith(SLUG_PREFIX) ? { consumed: url } : null;
// }

const rightPanelRoutes: Routes = [
  {
    path: 'view',
    component: LoginFormComponent,
    outlet: RouterOutlets.Right,
  },
];

// const routes: Routes = [
//   {
//     matcher: slugMatcher,
//     component: LoginFormComponent,
//     data: { fetch: true },
//   },
// ];

@NgModule({
  // imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutesModule {

  constructor(private router: Router) {
    this.router.config.push(...rightPanelRoutes);
  }
}

import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes, UrlSegment } from '@angular/router';
import { Pages, RouterOutlets, SLUG_PREFIX } from 'src/app/config/app-config';
import { NavigatorService } from 'src/app/services/navigator.service';
import { SelectUserProfileGuard } from './guard/select-user-profile.guard';
import { UserProfileComponent } from './user-profile.component';

const routes: Routes = [
  {
    path: '',
    component: UserProfileComponent,
    canActivate: [SelectUserProfileGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserProfileRoutesModule {}

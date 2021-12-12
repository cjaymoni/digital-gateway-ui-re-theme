import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes, UrlSegment } from '@angular/router';
import { Pages, RouterOutlets, SLUG_PREFIX } from 'src/app/config/app-config';
import { NavigatorService } from 'src/app/services/navigator.service';
import { SettingsViewComponent } from './pages/settings-view/settings-view.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppSettingsRoutesModule {}

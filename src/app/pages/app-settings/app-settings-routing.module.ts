import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from 'src/app/services/role.guard';
import { SettingsViewComponent } from './pages/settings-view/settings-view.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsViewComponent,
    canActivate: [RoleGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppSettingsRoutesModule {}

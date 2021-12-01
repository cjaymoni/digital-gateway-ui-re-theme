import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigatorService } from 'src/app/services/navigator.service';
import { ForumListComponent } from './forum-list/forum-list.component';
import { ForumGuard } from './guard/forum.guard';
import { MyForumsListComponent } from './my-forums-list/my-forums-list.component';

const rightPanelRoutes: Routes = [];

const routes: Routes = [
  {
    path: '',
    component: ForumListComponent,
    canActivate: [ForumGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForumRoutesModule {
  constructor(private navigator: NavigatorService) {
    this.navigator.addRightPanelRoutes(rightPanelRoutes);
  }
}

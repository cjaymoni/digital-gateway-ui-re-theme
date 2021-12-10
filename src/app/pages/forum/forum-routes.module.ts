import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSegment } from '@angular/router';
import { NavigatorService } from 'src/app/services/navigator.service';
import { ForumListComponent } from './forum-list/forum-list.component';
import { ForumGuard } from './guard/forum.guard';
import { Pages, RouterOutlets, SLUG_PREFIX } from 'src/app/config/app-config';
import { ForumDetailsComponent } from 'src/app/shared-ui-modules/forum-details/forum-details.component';
import { ForumFormComponent } from 'src/app/shared-ui-modules/forum-form/forum-form.component';
import { MyForumsListComponent } from './my-forums-list/my-forums-list.component';
import { SelectForumGuard } from './guard/select-forum.guard';

export function slugMatcher(url: UrlSegment[]) {
  return url[0]?.path.startsWith(SLUG_PREFIX) ? { consumed: url } : null;
}
const rightPanelRoutes: Routes = [
  {
    matcher: Pages.Forum.matcher.view,
    component: ForumDetailsComponent,
    outlet: RouterOutlets.Right,
    data: { selectForum: true },
    canActivate: [SelectForumGuard],
  },
  {
    matcher: Pages.Forum.matcher.edit,
    component: ForumFormComponent,
    outlet: RouterOutlets.Right,
    canActivate: [SelectForumGuard],
  },
];

const routes: Routes = [
  {
    path: '',
    component: ForumListComponent,
    canActivate: [ForumGuard],
  },
  {
    path: Pages.Forum.myList,
    component: MyForumsListComponent,
    canActivate: [ForumGuard],
  },
  {
    path: Pages.Forum.add,
    component: ForumFormComponent,
    canActivate: [ForumGuard],
  },
  {
    // matcher: slugMatcher,
    path: Pages.Forum.viewDetails,
    component: ForumDetailsComponent,
    data: { fetch: true },
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

import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSegment } from '@angular/router';
import { NavigatorService } from 'src/app/services/navigator.service';
import { Pages, RouterOutlets, SLUG_PREFIX } from 'src/app/config/app-config';
import { ForumPostGuard } from './guard/forum-post.guard';
import { MyForumPostsComponent } from './my-forum-posts/my-forum-posts.component';
import { ForumPostDetailsComponent } from '../../shared-ui-modules/forum-post-details/forum-post-details.component';
import { ForumPostFormComponent } from '../../shared-ui-modules/forum-post-form/forum-post-form.component';
import { SelectForumPostGuard } from './guard/select-forum-post.guard';

export function slugMatcher(url: UrlSegment[]) {
  return url[0]?.path.startsWith(SLUG_PREFIX) ? { consumed: url } : null;
}
const rightPanelRoutes: Routes = [
  {
    matcher: Pages.ForumPost.matcher.view,
    component: ForumPostDetailsComponent,
    outlet: RouterOutlets.Right,
    data: { selectForum: true },
    canActivate: [SelectForumPostGuard],
  },
  {
    matcher: Pages.ForumPost.matcher.edit,
    component: ForumPostFormComponent,
    outlet: RouterOutlets.Right,
    canActivate: [SelectForumPostGuard],
  },
];

const routes: Routes = [
  {
    path: '',
    redirectTo: Pages.ForumPost.myList,
  },
  {
    path: Pages.ForumPost.myList,
    component: MyForumPostsComponent,
    canActivate: [ForumPostGuard],
  },
  {
    path: Pages.ForumPost.add,
    component: ForumPostFormComponent,
    canActivate: [ForumPostGuard],
  },
  {
    // matcher: slugMatcher,
    path: Pages.ForumPost.viewDetails,
    component: ForumPostDetailsComponent,
    data: { fetch: true },
    canActivate: [ForumPostGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForumPostRoutesModule {
  constructor(private navigator: NavigatorService) {
    this.navigator.addRightPanelRoutes(rightPanelRoutes);
  }
}

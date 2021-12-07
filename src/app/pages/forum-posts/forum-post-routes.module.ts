import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSegment } from '@angular/router';
import { Pages, RouterOutlets, SLUG_PREFIX } from 'src/app/config/app-config';
import { ForumPostDetailsComponent } from '../../shared-ui-modules/forum-post-details/forum-post-details.component';
import { ForumPostFormComponent } from '../../shared-ui-modules/forum-post-form/forum-post-form.component';
import { ForumPostGuard } from './guard/forum-post.guard';
import { MyForumPostsComponent } from './my-forum-posts/my-forum-posts.component';

export function slugMatcher(url: UrlSegment[]) {
  return url[0]?.path.startsWith(SLUG_PREFIX) ? { consumed: url } : null;
}

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
    path: Pages.ForumPost.view,
    component: ForumPostDetailsComponent,
    outlet: RouterOutlets.Modal,
    data: { selectForum: true },
    canActivate: [ForumPostGuard],
  },
  {
    path: Pages.ForumPost.edit,
    component: ForumPostFormComponent,
    outlet: RouterOutlets.Modal,
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
export class ForumPostRoutesModule {}

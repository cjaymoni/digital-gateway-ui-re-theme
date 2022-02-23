import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSegment } from '@angular/router';
import { Pages, RouterOutlets, SLUG_PREFIX } from 'src/app/config/app-config';
import { ForumPostDetailsComponent } from '../../shared-ui-modules/forum-post-details/forum-post-details.component';
import { ForumPostFormComponent } from '../../shared-ui-modules/forum-post-form/forum-post-form.component';
import { ForumPostGuard } from './guard/forum-post.guard';
import { MyForumPostsComponent } from './my-forum-posts/my-forum-posts.component';
import { ForumPostsModerationComponent } from './forum-posts-moderation/forum-posts-moderation.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: Pages.ForumPost.myList,
  },
  {
    path: Pages.ForumPost.moderation,
    component: ForumPostsModerationComponent,
    canActivate: [ForumPostGuard],
    data: { breadcrumb: 'Moderation' },
  },
  {
    path: Pages.ForumPost.myList,
    component: MyForumPostsComponent,
    canActivate: [ForumPostGuard],
    data: { breadcrumb: 'My Forum Posts' },
  },
  {
    path: Pages.ForumPost.add,
    component: ForumPostFormComponent,
    canActivate: [ForumPostGuard],
    data: { breadcrumb: 'Add Forum Post' },
  },
  {
    path: Pages.ForumPost.view,
    component: ForumPostDetailsComponent,
    outlet: RouterOutlets.Modal,
    data: { selectForum: true, breadcrumb: 'Preview Forum Post' },
    canActivate: [ForumPostGuard],
  },
  {
    path: Pages.ForumPost.edit,
    component: ForumPostFormComponent,
    outlet: RouterOutlets.Modal,
    canActivate: [ForumPostGuard],
    data: { breadcrumb: 'Edit Forum Post' },
  },
  {
    path: Pages.ForumPost.viewDetails,
    component: ForumPostDetailsComponent,
    data: { fetch: true, breadcrumb: 'View Forum Post' },
    canActivate: [ForumPostGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForumPostRoutesModule {}

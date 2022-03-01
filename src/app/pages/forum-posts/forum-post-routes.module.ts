import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSegment } from '@angular/router';
import {
  Pages,
  Roles,
  RouterOutlets,
  SLUG_PREFIX,
} from 'src/app/config/app-config';
import { ForumPostDetailsComponent } from '../../shared-ui-modules/forum-post-details/forum-post-details.component';
import { ForumPostFormComponent } from '../../shared-ui-modules/forum-post-form/forum-post-form.component';
import { ForumPostGuard } from './guard/forum-post.guard';
import { MyForumPostsComponent } from './my-forum-posts/my-forum-posts.component';
import { ForumPostsModerationComponent } from './forum-posts-moderation/forum-posts-moderation.component';
import { RoleGuard } from 'src/app/services/role.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: Pages.ForumPost.myList,
  },
  {
    path: Pages.ForumPost.moderation,
    component: ForumPostsModerationComponent,
    canActivate: [RoleGuard, ForumPostGuard],
    data: { breadcrumb: 'Moderation', roles: [Roles.Admin, Roles.Editor] },
  },
  {
    path: Pages.ForumPost.myList,
    component: MyForumPostsComponent,
    canActivate: [RoleGuard, ForumPostGuard],
    data: { breadcrumb: 'My Forum Posts', roles: [Roles.Admin, Roles.Editor] },
  },
  {
    path: Pages.ForumPost.add,
    component: ForumPostFormComponent,
    canActivate: [RoleGuard, ForumPostGuard],
    data: {
      breadcrumb: 'Add Forum Post',
      roles: [
        Roles.Admin,
        Roles.Editor,
        Roles.Contributor,
        Roles.Reporter,
        Roles.ServiceProvider,
      ],
    },
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
    canActivate: [RoleGuard, ForumPostGuard],
    data: { breadcrumb: 'Edit Forum Post', roles: [Roles.Admin, Roles.Editor] },
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

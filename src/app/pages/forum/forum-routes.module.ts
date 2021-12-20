import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pages, RouterOutlets } from 'src/app/config/app-config';
import { ForumDetailsComponent } from 'src/app/shared-ui-modules/forum-details/forum-details.component';
import { ForumFormComponent } from 'src/app/shared-ui-modules/forum-form/forum-form.component';
import { ForumPostDetailsComponent } from 'src/app/shared-ui-modules/forum-post-details/forum-post-details.component';
import { ForumPostDetailsModule } from '../../shared-ui-modules/forum-post-details/forum-post-details.module';
import { CommentsOfCommentsComponent } from './comments-of-comments/comments-of-comments.component';
import { ForumListComponent } from './forum-list/forum-list.component';
import { ForumGuard } from './guard/forum.guard';
import { MyForumsListComponent } from './my-forums-list/my-forums-list.component';

const routes: Routes = [
  {
    path: '',
    component: ForumListComponent,
    canActivate: [ForumGuard],
  },
  {
    path: Pages.Forum.viewSubComments,
    component: CommentsOfCommentsComponent,
    outlet: RouterOutlets.Right,
    canActivate: [ForumGuard],
    data: { breadcrumb: 'Commments' },
  },
  {
    path: Pages.Forum.myList,
    component: MyForumsListComponent,
    canActivate: [ForumGuard],
    data: { breadcrumb: 'Forum Moderation' },
  },
  {
    path: Pages.Forum.add,
    component: ForumFormComponent,
    canActivate: [ForumGuard],
    data: { breadcrumb: 'Add Forum' },
  },
  {
    path: Pages.Forum.viewPost,
    component: ForumPostDetailsComponent,
    canActivate: [ForumGuard],
    data: { breadcrumb: 'View Forum Post Details' },
  },
  {
    path: Pages.Forum.viewDetails,
    component: ForumDetailsComponent,
    data: { fetch: true, breadcrumb: 'View Forum Details' },
    canActivate: [ForumGuard],
  },
  {
    path: Pages.Forum.viewPostDetails,
    component: ForumPostDetailsModule,
    data: { fetch: true, breadcrumb: 'View Forum Post Details' },
    canActivate: [ForumGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForumRoutesModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyForumsListModule } from './my-forums-list/my-forums-list.module';
import { ForumListModule } from './forum-list/forum-list.module';
import { HttpClientModule } from '@angular/common/http';
import { ForumRoutesModule } from './forum-routes.module';
import { ForumDetailsModule } from '../../shared-ui-modules/forum-details/forum-details.module';
import { ForumFormModule } from 'src/app/shared-ui-modules/forum-form/forum-form.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ForumRoutesModule,
    MyForumsListModule,
    ForumListModule,
    HttpClientModule,
    ForumDetailsModule,
    ForumFormModule,
  ],
})
export class ForumModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyForumsListModule } from './my-forums-list/my-forums-list.module';
import { ForumListModule } from './forum-list/forum-list.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MyForumsListModule,
    ForumListModule,
    HttpClientModule,
  ],
})
export class ForumModule {}

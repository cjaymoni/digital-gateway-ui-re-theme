import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultimediaManagementRoutingModule } from './multimedia-management-routing.module';
import { MultimediaListModule } from './multimedia-list/multimedia-list.module';
import { MultimediaFormModule } from './multimedia-form/multimedia-form.module';

@NgModule({
  imports: [
    CommonModule,
    MultimediaManagementRoutingModule,
    MultimediaListModule,
    MultimediaFormModule,
  ],
})
export class MultimediaManagementModule {}

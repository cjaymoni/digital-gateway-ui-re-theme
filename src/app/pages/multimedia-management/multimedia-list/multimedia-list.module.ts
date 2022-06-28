import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultimediaListComponent } from './multimedia-list.component';
import { AppTableModule } from 'src/app/shared-ui-modules/app-table/app-table.module';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { AppPipesModule } from 'src/app/pipes/app-pipes.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { AppHeadingModule } from '../../../shared-ui-modules/app-heading/app-heading.module';

@NgModule({
  imports: [
    CommonModule,
    AppTableModule,
    ButtonModule,
    MessageModule,
    AppPipesModule,
    DirectivesModule,
    AppHeadingModule,
  ],
  declarations: [MultimediaListComponent],
  exports: [MultimediaListComponent],
})
export class MultimediaListModule {}


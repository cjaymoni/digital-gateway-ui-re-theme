import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultimediaListComponent } from './multimedia-list.component';
import { AppTableModule } from 'src/app/shared-ui-modules/app-table/app-table.module';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { AppPipesModule } from 'src/app/pipes/app-pipes.module';

@NgModule({
  imports: [
    CommonModule,
    AppTableModule,
    ButtonModule,
    MessageModule,
    AppPipesModule,
  ],
  declarations: [MultimediaListComponent],
  exports: [MultimediaListComponent],
})
export class MultimediaListModule {}
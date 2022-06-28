import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnersListComponent } from './partners-list.component';
import { AppTableModule } from 'src/app/shared-ui-modules/app-table/app-table.module';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { AppPipesModule } from 'src/app/pipes/app-pipes.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { AppHeadingModule } from 'src/app/shared-ui-modules/app-heading/app-heading.module';

@NgModule({
  imports: [
    CommonModule,
    AppTableModule,
    ButtonModule,
    AppPipesModule,
    DirectivesModule,
    TooltipModule,
    AppHeadingModule,
  ],
  declarations: [PartnersListComponent],
  exports: [PartnersListComponent],
})
export class PartnersListModule {}


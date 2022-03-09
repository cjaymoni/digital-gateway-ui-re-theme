import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ResourceCardComponent } from './resource-card.component';
import { TooltipModule } from 'primeng/tooltip';
import { AppPipesModule } from 'src/app/pipes/app-pipes.module';

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    TooltipModule,
    AppPipesModule,
  ],
  exports: [ResourceCardComponent],
  declarations: [ResourceCardComponent],
})
export class ResourceCardModule {}

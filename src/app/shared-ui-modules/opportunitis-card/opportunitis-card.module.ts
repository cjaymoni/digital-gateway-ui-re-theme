import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpportunitisCardComponent } from './opportunitis-card.component';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { TooltipModule } from 'primeng/tooltip';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { AppPipesModule } from 'src/app/pipes/app-pipes.module';

@NgModule({
  imports: [
    CommonModule,
    ImageModule,
    AppPipesModule,
    DirectivesModule,
    CardModule,
    TooltipModule,
  ],
  declarations: [OpportunitisCardComponent],
  exports: [OpportunitisCardComponent],
})
export class OpportunitisCardModule {}

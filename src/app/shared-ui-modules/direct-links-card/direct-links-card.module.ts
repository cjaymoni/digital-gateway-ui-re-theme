import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectLinksCardComponent } from './direct-links-card.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { AppPipesModule } from 'src/app/pipes/app-pipes.module';

@NgModule({
  imports: [
    CommonModule,
    AppPipesModule,
    DirectivesModule,
    CardModule,
    ButtonModule,
    TooltipModule,
  ],
  declarations: [DirectLinksCardComponent],
  exports: [DirectLinksCardComponent],
})
export class DirectLinksCardModule {}

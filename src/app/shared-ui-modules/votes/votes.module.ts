import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { VotesComponent } from './votes.component';

@NgModule({
  declarations: [VotesComponent],
  imports: [CommonModule, ButtonModule, TooltipModule, DirectivesModule],
  exports: [VotesComponent],
})
export class VotesModule {}

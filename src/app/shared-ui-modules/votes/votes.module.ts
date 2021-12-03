import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VotesComponent } from './votes.component';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DirectivesModule } from 'src/app/directives/directives.module';

@NgModule({
  declarations: [VotesComponent],
  imports: [CommonModule, ButtonModule, TooltipModule, DirectivesModule],
  exports: [VotesComponent],
})
export class VotesModule {}

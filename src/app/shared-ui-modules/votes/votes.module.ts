import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VotesComponent } from './votes.component';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [VotesComponent],
  imports: [CommonModule, ButtonModule, TooltipModule],
  exports: [VotesComponent],
})
export class VotesModule {}

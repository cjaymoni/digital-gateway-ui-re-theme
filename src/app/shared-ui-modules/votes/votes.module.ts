import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VotesComponent } from './votes.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [VotesComponent],
  imports: [CommonModule, ButtonModule],
  exports: [VotesComponent],
})
export class VotesModule {}

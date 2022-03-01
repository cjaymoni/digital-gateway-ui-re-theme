import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoResultsFoundComponent } from './no-results-found.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NoResultsFoundComponent],
  imports: [CommonModule, RouterModule],
  exports: [NoResultsFoundComponent],
})
export class NoResultsFoundModule {}

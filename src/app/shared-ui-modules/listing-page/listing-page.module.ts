import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingPageComponent } from './listing-page.component';
import { SkeletonModule } from 'primeng/skeleton';
import { NoResultsFoundModule } from '../no-results-found/no-results-found.module';

@NgModule({
  declarations: [ListingPageComponent],
  imports: [CommonModule, SkeletonModule, NoResultsFoundModule],
  exports: [ListingPageComponent],
})
export class ListingPageModule {}

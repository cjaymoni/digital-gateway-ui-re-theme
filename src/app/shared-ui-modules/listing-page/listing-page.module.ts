import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingPageComponent } from './listing-page.component';
import { SkeletonModule } from 'primeng/skeleton';
import { NoResultsFoundModule } from '../no-results-found/no-results-found.module';
import { AppHeadingModule } from '../app-heading/app-heading.module';

@NgModule({
  declarations: [ListingPageComponent],
  imports: [
    CommonModule,
    SkeletonModule,
    NoResultsFoundModule,
    AppHeadingModule,
  ],
  exports: [ListingPageComponent],
})
export class ListingPageModule {}


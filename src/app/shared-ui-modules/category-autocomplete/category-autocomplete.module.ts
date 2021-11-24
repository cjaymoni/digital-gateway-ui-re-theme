import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryAutocompleteComponent } from './category-autocomplete.component';
import { AppAutoCompleteModule } from '../app-auto-complete/app-auto-complete.module';

@NgModule({
  declarations: [CategoryAutocompleteComponent],
  imports: [CommonModule, AppAutoCompleteModule],
  exports: [CategoryAutocompleteComponent],
})
export class CategoryAutocompleteModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductTypeAutocompleteComponent } from './product-type-autocomplete.component';
import { AppAutoCompleteModule } from '../app-auto-complete/app-auto-complete.module';

@NgModule({
  declarations: [ProductTypeAutocompleteComponent],
  imports: [CommonModule, AppAutoCompleteModule],
  exports: [ProductTypeAutocompleteComponent],
})
export class ProductTypeAutocompleteModule {}

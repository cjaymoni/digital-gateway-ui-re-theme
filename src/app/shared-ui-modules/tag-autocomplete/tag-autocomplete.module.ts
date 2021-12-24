import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagAutocompleteComponent } from './tag-autocomplete.component';
import { AppAutoCompleteModule } from '../app-auto-complete/app-auto-complete.module';

@NgModule({
  declarations: [TagAutocompleteComponent],
  imports: [CommonModule, AppAutoCompleteModule],
  exports: [TagAutocompleteComponent],
})
export class TagAutocompleteModule {}

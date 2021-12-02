import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumAutocompleteComponent } from './forum-autocomplete.component';
import { AppAutoCompleteModule } from '../app-auto-complete/app-auto-complete.module';

@NgModule({
  declarations: [ForumAutocompleteComponent],
  imports: [CommonModule, AppAutoCompleteModule],

  exports: [ForumAutocompleteComponent],
})
export class ForumAutocompleteModule {}

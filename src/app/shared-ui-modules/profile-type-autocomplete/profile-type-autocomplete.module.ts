import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileTypeAutocompleteComponent } from './profile-type-autocomplete.component';
import { AppAutoCompleteModule } from '../app-auto-complete/app-auto-complete.module';

@NgModule({
  imports: [CommonModule, AppAutoCompleteModule],
  declarations: [ProfileTypeAutocompleteComponent],
  exports: [ProfileTypeAutocompleteComponent],
})
export class ProfileTypeAutocompleteModule {}

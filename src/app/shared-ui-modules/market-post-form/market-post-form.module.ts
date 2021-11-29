import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketPostFormComponent } from './market-post-form.component';
import { ImageUploadModule } from '../image-upload/image-upload.module';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TagAutocompleteModule } from '../tag-autocomplete/tag-autocomplete.module';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ImageUploadModule,
    InputNumberModule,
    InputTextareaModule,
    TagAutocompleteModule,
    InputTextModule,
    ButtonModule,
  ],
  declarations: [MarketPostFormComponent],
  exports: [MarketPostFormComponent],
})
export class MarketPostFormModule {}

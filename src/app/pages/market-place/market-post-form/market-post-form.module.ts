import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketPostFormComponent } from './market-post-form.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ImageUploadModule } from 'src/app/shared-ui-modules/image-upload/image-upload.module';
import { TagAutocompleteModule } from 'src/app/shared-ui-modules/tag-autocomplete/tag-autocomplete.module';
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

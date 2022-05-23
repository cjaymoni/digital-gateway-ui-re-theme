import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnersFormComponent } from './partners-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ImageUploadModule } from 'src/app/shared-ui-modules/image-upload/image-upload.module';
import { ErrorTailorModule } from '@ngneat/error-tailor';
import { DirectivesModule } from 'src/app/directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    ImageUploadModule,
    ErrorTailorModule,
    DirectivesModule,
  ],
  declarations: [PartnersFormComponent],
  exports: [PartnersFormComponent],
})
export class PartnersFormModule { }

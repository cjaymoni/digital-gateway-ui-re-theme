import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultimediaFormComponent } from './multimedia-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    DropdownModule,
    SelectButtonModule,
    InputTextModule,
  ],
  declarations: [MultimediaFormComponent],
  exports: [MultimediaFormComponent],
})
export class MultimediaFormModule {}

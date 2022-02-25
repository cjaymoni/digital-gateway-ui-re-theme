import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturedArticlesSettingsComponent } from './featured-articles-settings.component';
import { ButtonModule } from 'primeng/button';
import { PickListModule } from 'primeng/picklist';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PickListModule,
    ButtonModule,
    InputTextModule,
  ],
  declarations: [FeaturedArticlesSettingsComponent],
  exports: [FeaturedArticlesSettingsComponent],
})
export class FeaturedArticlesSettingsModule {}

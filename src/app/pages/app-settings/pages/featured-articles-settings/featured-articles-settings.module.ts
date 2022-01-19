import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturedArticlesSettingsComponent } from './featured-articles-settings.component';
import { ButtonModule } from 'primeng/button';
import { PickListModule } from 'primeng/picklist';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PickListModule,
    ButtonModule,
  ],
  declarations: [FeaturedArticlesSettingsComponent],
  exports: [FeaturedArticlesSettingsComponent],
})
export class FeaturedArticlesSettingsModule {}

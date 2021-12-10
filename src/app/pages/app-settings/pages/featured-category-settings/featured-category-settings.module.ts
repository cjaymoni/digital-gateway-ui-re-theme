import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturedCategorySettingsComponent } from './featured-category-settings.component';
import { PickListModule } from 'primeng/picklist';
import { ButtonModule } from 'primeng/button';

@NgModule({
  imports: [CommonModule, PickListModule, ButtonModule],
  declarations: [FeaturedCategorySettingsComponent],
  exports: [FeaturedCategorySettingsComponent],
})
export class FeaturedCategorySettingsModule {}

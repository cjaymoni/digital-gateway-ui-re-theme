import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturedCategorySettingsComponent } from './featured-category-settings.component';
import { PickListModule } from 'primeng/picklist';

@NgModule({
  imports: [CommonModule, PickListModule],
  declarations: [FeaturedCategorySettingsComponent],
  exports: [FeaturedCategorySettingsComponent],
})
export class FeaturedCategorySettingsModule {}

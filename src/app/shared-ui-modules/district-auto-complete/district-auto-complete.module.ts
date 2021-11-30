import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DistrictAutoCompleteComponent } from './district-auto-complete.component';
import { AppAutoCompleteModule } from '../app-auto-complete/app-auto-complete.module';

@NgModule({
  declarations: [DistrictAutoCompleteComponent],
  imports: [CommonModule, AppAutoCompleteModule],
  exports: [DistrictAutoCompleteComponent],
})
export class DistrictAutoCompleteModule {}

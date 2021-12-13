import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ResourceCardComponent } from './resource-card.component';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  imports: [CommonModule, CardModule, ButtonModule, TooltipModule],
  exports: [ResourceCardComponent],
  declarations: [ResourceCardComponent],
})
export class ResourceCardModule {}

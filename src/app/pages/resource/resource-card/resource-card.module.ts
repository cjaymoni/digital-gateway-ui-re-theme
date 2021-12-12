import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ResourceCardComponent } from './resource-card.component';

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
  ],
  exports: [ResourceCardComponent],
  declarations: [ResourceCardComponent]
})
export class ResourceCardModule { }

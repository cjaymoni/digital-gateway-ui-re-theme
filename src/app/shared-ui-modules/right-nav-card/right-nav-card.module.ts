import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RightNavCard } from './right-nav-card.component';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';

@NgModule({
  imports: [CommonModule, CardModule, DividerModule],
  declarations: [RightNavCard],
  exports: [RightNavCard],
})
export class RightNavCardModule {}

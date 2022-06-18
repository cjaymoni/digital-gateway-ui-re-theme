import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { PartnersCardModule } from '../partners-card/partners-card.module';
import { PartnersViewComponent } from './partners.component';

@NgModule({
  declarations: [PartnersViewComponent],
  imports: [CommonModule, CarouselModule, DirectivesModule, PartnersCardModule],
  exports: [PartnersViewComponent],
})
export class PartnersViewModule {}


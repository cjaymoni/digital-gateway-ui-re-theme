import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { FooterCategoryComponent } from './components/footer-category/footer-category.component';
import { FooterQuickLinksComponent } from './components/footer-quick-links/footer-quick-links.component';
import { FooterSocialsComponent } from './components/footer-socials/footer-socials.component';
import { FooterPoweredByComponent } from './components/footer-powered-by/footer-powered-by.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    FooterComponent,  
    FooterCategoryComponent,
    FooterQuickLinksComponent,
    FooterSocialsComponent,
    FooterPoweredByComponent
  ],
  exports:[FooterComponent]
})
export class FooterModule { }

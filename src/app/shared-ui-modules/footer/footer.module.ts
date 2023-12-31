import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { FooterContactUsComponent } from './components/footer-contact-us/footer-contact-us.component';
import { FooterQuickLinksComponent } from './components/footer-quick-links/footer-quick-links.component';
import { FooterSocialsComponent } from './components/footer-socials/footer-socials.component';
import { FooterPoweredByComponent } from './components/footer-powered-by/footer-powered-by.component';
import { RouterModule } from '@angular/router';
import { FooterMiniInfoComponent } from './components/footer-mini-info/footer-mini-info.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    FooterComponent,
    FooterContactUsComponent,
    FooterQuickLinksComponent,
    FooterSocialsComponent,
    FooterPoweredByComponent,
    FooterMiniInfoComponent,
  ],
  exports: [FooterComponent],
})
export class FooterModule {}


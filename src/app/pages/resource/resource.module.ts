import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceRoutingModule } from './resource-routing.module';
import { ResourceFormModule } from './resource-form/resource-form.module';
import { ResourceListModule } from './resource-list/resource-list.module';
import { DirectLinksModule } from './direct-links/direct-links.module';

@NgModule({
  imports: [
    CommonModule,
    ResourceRoutingModule,
    ResourceFormModule,
    ResourceListModule,
    DirectLinksModule,
  ],
  declarations: []
})
export class ResourceModule { }

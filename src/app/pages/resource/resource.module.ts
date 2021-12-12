import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceRoutingModule } from './resource-routing.module';
import { ResourceFormModule } from './resource-form/resource-form.module';
import { ResourceListModule } from './resource-list/resource-list.module';

@NgModule({
  imports: [
    CommonModule,
    ResourceRoutingModule,
    ResourceFormModule,
    ResourceListModule,
  ],
  declarations: []
})
export class ResourceModule { }

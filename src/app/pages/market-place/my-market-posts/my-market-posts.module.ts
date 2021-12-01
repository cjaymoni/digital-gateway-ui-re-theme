import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyMarketPostsComponent } from './my-market-posts.component';
import { AppTableModule } from 'src/app/shared-ui-modules/app-table/app-table.module';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  imports: [
    CommonModule,
    AppTableModule,
    ButtonModule,
    TooltipModule,
  ],
  declarations: [MyMarketPostsComponent]
})
export class MyMarketPostsModule { }

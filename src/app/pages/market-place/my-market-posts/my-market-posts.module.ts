import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { AppPipesModule } from 'src/app/pipes/app-pipes.module';
import { AppTableModule } from 'src/app/shared-ui-modules/app-table/app-table.module';
import { MyMarketPostsComponent } from './my-market-posts.component';

@NgModule({
  imports: [
    CommonModule,
    AppTableModule,
    ButtonModule,
    TooltipModule,
    AppPipesModule,
  ],
  declarations: [MyMarketPostsComponent],
})
export class MyMarketPostsModule {}

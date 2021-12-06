import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ArticleGuard } from '../articles/guard/article.guard';
import { MarketPlaceGuard } from '../market-place/guard/market-place.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [ArticleGuard, MarketPlaceGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingRoutingModule {}

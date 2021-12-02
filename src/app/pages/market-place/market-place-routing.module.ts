import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterOutlets, SLUG_PREFIX } from 'src/app/config/app-config';
import { NavigatorService } from 'src/app/services/navigator.service';
import { MarketPlaceGuard } from './guard/market-place.guard';
import { MarketPlaceListComponent } from './market-place-list/market-place-list.component';
import { MarketPostFormComponent } from './market-post-form/market-post-form.component';
import { MyMarketPostsComponent } from './my-market-posts/my-market-posts.component';

const rightPanelRoutes: Routes = [
  {
    path: 'view',
    component: MarketPlaceListComponent,
    outlet: RouterOutlets.Right,
    canActivate: [MarketPlaceGuard],
  },
  {
    path: 'edit/:id',
    component: MarketPostFormComponent,
    outlet: RouterOutlets.Right,
    canActivate: [MarketPlaceGuard],
  },
];

const routes: Routes = [
  {
    path: '',
    component: MarketPlaceListComponent,
    canActivate: [MarketPlaceGuard],
  },
  {
    path: 'add',
    component: MarketPostFormComponent,
    canActivate: [MarketPlaceGuard],
  },
  {
    path: 'my-market-place-items',
    component: MyMarketPostsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarketPlaceRoutingModule {
  constructor(private navigator: NavigatorService) {
    this.navigator.addRightPanelRoutes(rightPanelRoutes);
  }
}

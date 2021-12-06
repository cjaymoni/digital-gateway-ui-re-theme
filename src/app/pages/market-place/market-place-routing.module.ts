import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pages, RouterOutlets, SLUG_PREFIX } from 'src/app/config/app-config';
import { NavigatorService } from 'src/app/services/navigator.service';
import { MarketPlaceGuard } from './guard/market-place.guard';
import { MarketPlaceListComponent } from './market-place-list/market-place-list.component';
import { MarketPostFormComponent } from './market-post-form/market-post-form.component';
import { MyMarketPostsComponent } from './my-market-posts/my-market-posts.component';
import { MarketListDetailsComponent } from './market-list-details/market-list-details.component';

const rightPanelRoutes: Routes = [
  {
    path: Pages.MarketPlace.view,
    component: MarketPlaceListComponent,
    outlet: RouterOutlets.Right,
    canActivate: [MarketPlaceGuard],
  },
  {
    path: Pages.MarketPlace.edit,
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
    path: Pages.MarketPlace.add,
    component: MarketPostFormComponent,
    canActivate: [MarketPlaceGuard],
  },
  {
    path: Pages.MarketPlace.myList,
    component: MyMarketPostsComponent,
  },
  {
    path: Pages.MarketPlace.viewDetails,
    component: MarketListDetailsComponent,
    canActivate: [MarketPlaceGuard],
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

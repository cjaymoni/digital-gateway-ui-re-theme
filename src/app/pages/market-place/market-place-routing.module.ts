import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigatorService } from 'src/app/services/navigator.service';
import { MarketPlaceGuard } from './guard/market-place.guard';
import { MarketPlaceListComponent } from './market-place-list/market-place-list.component';
import { MarketPostFormComponent } from './market-post-form/market-post-form.component';
import { MyMarketPostsComponent } from './my-market-posts/my-market-posts.component';

const rightPanelRoutes: Routes = [
  // { path: '', component: MarketPlaceComponent },
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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pages, RouterOutlets } from 'src/app/config/app-config';
import { NavigatorService } from 'src/app/services/navigator.service';
import { RoleGuard } from 'src/app/services/role.guard';
import { MarketPlaceGuard } from './guard/market-place.guard';
import { MarketListDetailsComponent } from './market-list-details/market-list-details.component';
import { MarketPlaceListComponent } from './market-place-list/market-place-list.component';
import { MarketPostFormComponent } from './market-post-form/market-post-form.component';
import { MyMarketPostsComponent } from './my-market-posts/my-market-posts.component';

const rightPanelRoutes: Routes = [];

const routes: Routes = [
  {
    path: '',
    component: MarketPlaceListComponent,
    canActivate: [MarketPlaceGuard],
  },
  {
    path: Pages.MarketPlace.add,
    component: MarketPostFormComponent,
    canActivate: [MarketPlaceGuard, RoleGuard],
    data: {
      breadcrumb: 'Add Advert',
    },
  },
  {
    path: Pages.MarketPlace.view,
    component: MarketListDetailsComponent,
    outlet: RouterOutlets.Right,
    canActivate: [MarketPlaceGuard],
    data: {
      breadcrumb: 'View Advert',
    },
  },
  {
    path: Pages.MarketPlace.edit,
    component: MarketPostFormComponent,
    outlet: RouterOutlets.Modal,
    canActivate: [MarketPlaceGuard, RoleGuard],
    data: {
      breadcrumb: 'Edit Advert',
    },
  },
  {
    path: Pages.MarketPlace.myList,
    component: MyMarketPostsComponent,
    canActivate: [MarketPlaceGuard, RoleGuard],
    data: {
      breadcrumb: 'Advert List',
    },
  },
  {
    path: Pages.MarketPlace.viewDetails,
    component: MarketListDetailsComponent,
    canActivate: [MarketPlaceGuard],
    data: {
      breadcrumb: 'View Advert Details',
    },
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

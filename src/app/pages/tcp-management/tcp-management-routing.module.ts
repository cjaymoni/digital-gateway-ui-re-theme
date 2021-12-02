import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TcpLayoutComponent } from './tcp-layout/tcp-layout.component';

const routes: Routes = [
  {
    path: '',
    component: TcpLayoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TcpManagementRoutingModule {}

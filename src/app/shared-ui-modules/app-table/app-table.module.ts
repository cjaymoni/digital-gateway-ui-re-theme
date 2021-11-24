import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppTableComponent } from './app-table.component';
import {TableModule} from 'primeng/table';

@NgModule({
  imports: [
    TableModule,
    CommonModule,

  ],
  declarations: [AppTableComponent],
  exports:[AppTableComponent]
})
export class AppTableModule { }

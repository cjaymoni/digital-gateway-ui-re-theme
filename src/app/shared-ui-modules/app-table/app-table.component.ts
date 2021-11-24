import { Component, OnInit, ChangeDetectionStrategy, Input, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-app-table',
  templateUrl: './app-table.component.html',
  styleUrls: ['./app-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppTableComponent implements OnInit {

  @Input()
  data: any[] | undefined;

  dataToDisplay: any[] | undefined;

  @Input()
  title: string = "Data Table";

  @Input()
  showAction = false;


  @Input()
  actionTemplate: TemplateRef<any> | undefined;

  @Input()
  bodyTemplate: TemplateRef<any> | undefined;

  @Input()
  headerTemplate: TemplateRef<any> | undefined;

  @Input()
  columnsDefinition: { field: string; header: string; template?: TemplateRef<any>; }[] | undefined;

  @Input()
  totalDataLength: any;
  
  @Input()
  searchFunction : ((toSearch: any) => Observable<any[]>) | undefined

  @Input()
  searchPlaceholder  = 'Enter value to search'
  
  @Input()
  showPaginator = true;

  @Input()
  refreshDataFunction: (()=>void) | undefined;

  @Input()
  showCaption = true;
  constructor() { }
  selectedData = [];
  ngOnInit() {
  }

  refreshData(){
    // this.refreshDataFunction();
  }

}

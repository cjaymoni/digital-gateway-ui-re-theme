import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  TemplateRef,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, filter, switchMap, tap } from 'rxjs/operators';
import { DEFAULT_PAGE_SIZE } from 'src/app/config/app-config';
@Component({
  selector: 'app-table',
  templateUrl: './app-table.component.html',
  styleUrls: ['./app-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppTableComponent implements OnInit, AfterViewInit {
  @Input()
  data: any[] = [];

  dataToDisplay: any[] = [];

  @Input()
  title: string = 'Data Table';

  @Input()
  batchAction = false;

  @Input()
  batchActionTemplate: TemplateRef<any> | null = null;

  @Input()
  showAction = false;

  @Input()
  actionTemplate: TemplateRef<any> | null = null;

  @Input()
  bodyTemplate: TemplateRef<any> | null = null;

  @Input()
  headerTemplate: TemplateRef<any> | null = null;

  @Input()
  columnsDefinition!: {
    field: string;
    header: string;
    template?: TemplateRef<any>;
    subField?: string;
  }[];

  @Input()
  totalDataLength = 0;

  @Input()
  searchFunction: (toSearch: string) => Observable<any[]> = query => {
    const filtered = this.data?.filter(d => {
      console.log(d);

      return (
        d.name?.toLowerCase().includes(query) ||
        d.title?.toLowerCase().includes(query)
      );
    });
    console.log(filtered);

    return of(filtered || []);
  };

  @Input()
  searchPlaceholder = 'Enter value to search';

  @Input()
  showPaginator = true;

  @Input()
  refreshDataFunction: (() => void) | undefined;

  @Input()
  showCaption = true;

  @Input()
  getRowStyle = (rd: any) => {
    return {};
  };

  constructor(private cdref: ChangeDetectorRef) {}

  selectedData = [];
  searchFormControl = new FormControl('');

  ngOnInit() {
    this.getPaginatedData();
    if (this.searchFunction) {
      this.dataToDisplay;
      this.searchFormControl.valueChanges
        .pipe(
          debounceTime(300),
          // distinctUntilChanged(),
          tap((_: string) => {
            if (_ === '') {
              this.getPaginatedData();
            }
          }),
          filter(d => d.trim() !== ''),
          switchMap(search => {
            return this.searchFunction(search.toLocaleLowerCase());
          })
        )
        .subscribe(d => (this.dataToDisplay = d));
    }
  }

  getPaginatedData() {
    if (this.data && this.columnsDefinition) {
      this.dataToDisplay = this.data.slice(0, DEFAULT_PAGE_SIZE);
    }

    if (!this.totalDataLength && this.data) {
      this.totalDataLength = this.data.length;
    }

    this.selectedData = [];
    this.cdref.detectChanges();
  }

  ngAfterViewInit(): void {}
  ngOnChanges(): void {
    this.getPaginatedData();
  }
  getOptions() {
    const options = [50, 100, 200];

    // const max = this.paginatorService.paginatorDetails.total;
    // if (max > options[options.length - 1]) {
    //   options.push(max);
    // }
    return options;
  }

  renderRow(rowData: any) {
    return this.getRowStyle(rowData);
  }

  onPageChange(event: any) {
    const start = event.page * event.rows;
    const end = event.rows + start;
    // this.dataToDisplay = this.data.slice(start, end);
  }
  refreshData() {
    // this.refreshDataFunction();
  }
}

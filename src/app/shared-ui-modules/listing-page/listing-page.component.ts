import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  TemplateRef,
} from '@angular/core';

export enum LoadingPageStyle {
  Rectangle = 'rectangle',
  Square = 'square',
}
@Component({
  selector: 'app-listing-page',
  templateUrl: './listing-page.component.html',
  styleUrls: ['./listing-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListingPageComponent implements OnInit {
  @Input() loading = true;
  @Input() items: any[] | any = [];
  @Input() title = 'Listing';
  @Input() description: string | undefined;
  @Input() itemClass = 'col-6 md:col-4 p-4';
  @Input() itemTemplate!: TemplateRef<any>;
  @Input() sideTemplate: TemplateRef<any> | undefined;
  @Input() headerTemplate: TemplateRef<any> | undefined;

  constructor() {}

  ngOnInit(): void {}
}


import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  TemplateRef,
} from '@angular/core';

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
  @Input() itemClass = 'col-12 md:col-6 lg:col-4';
  @Input() itemTemplate!: TemplateRef<any>;

  constructor() {}

  ngOnInit(): void {}
}

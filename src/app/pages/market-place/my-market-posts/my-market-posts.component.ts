import { AfterViewInit, Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-my-market-posts',
  templateUrl: './my-market-posts.component.html',
  styleUrls: ['./my-market-posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyMarketPostsComponent implements OnInit, AfterViewInit {

  columns: any[] = [];

  constructor() { }

  ngAfterViewInit(): void {
    this.columns = [
      { header: 'PRODUCT', field: '' },
      { header: 'DESCRIPTION', field: '' },
      { header: 'PRICE', field: ''},
    ];
  }

  ngOnInit() {
  }

  goToAddPostPage(){}

  viewMarketAd(market: any){}

  editMarketAd(market: any){}

}

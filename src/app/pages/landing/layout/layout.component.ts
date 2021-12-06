import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { articleSelectors } from 'src/app/store/selectors/article.selectors';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit {

  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 5,
      numScroll: 3,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  productImage = [
    { image: 'img.png', name: 'ex' },
    { image: 'img.png', name: 'ex' },
    { image: 'img.png', name: 'ex' },
    { image: 'img.png', name: 'ex' },
  ];

  articles$ = this.store.select(articleSelectors.all);

  constructor(private store: Store) { }

  ngOnInit() {
  }

}

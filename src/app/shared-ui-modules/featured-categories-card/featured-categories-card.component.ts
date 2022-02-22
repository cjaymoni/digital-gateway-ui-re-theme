import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-featured-categories-card',
  templateUrl: './featured-categories-card.component.html',
  styleUrls: ['./featured-categories-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeaturedCategoriesCardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

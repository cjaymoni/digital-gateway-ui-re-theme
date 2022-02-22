import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-featured-categories-card',
  templateUrl: './featured-categories-card.component.html',
  styleUrls: ['./featured-categories-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedCategoriesCardComponent implements OnInit {
  @Input() category: Category | null = null;
  imageSrc =
    'https://www.collinsdictionary.com/images/full/market_large_354703739_1000.jpg';
  constructor() {}

  ngOnInit() {}
}

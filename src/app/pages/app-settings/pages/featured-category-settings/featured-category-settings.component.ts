import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Category } from 'src/app/models/category.model';
import { categorySelectors } from 'src/app/store/selectors/category.selectors';

@Component({
  selector: 'app-featured-category-settings',
  templateUrl: './featured-category-settings.component.html',
  styleUrls: ['./featured-category-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedCategorySettingsComponent implements OnInit {
  sourceProducts: Category[] = [];

  targetProducts: Category[] = [];

  categories$ = this.store.select(categorySelectors.all);

  constructor(private store: Store) {}

  ngOnInit(): void {}
}

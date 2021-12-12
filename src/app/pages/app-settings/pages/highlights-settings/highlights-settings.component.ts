import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Category } from 'src/app/models/category.model';
import { categorySelectors } from 'src/app/store/selectors/category.selectors';

@Component({
  selector: 'app-highlights-settings',
  templateUrl: './highlights-settings.component.html',
  styleUrls: ['./highlights-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HighlightsSettingsComponent implements OnInit {
  sourceProducts: Category[] = [];

  targetProducts: Category[] = [];

  categories$ = this.store.select(categorySelectors.all);

  constructor(private store: Store) {}

  ngOnInit() {}
}

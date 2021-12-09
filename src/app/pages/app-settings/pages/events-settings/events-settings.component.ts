import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Category } from '../../../../models/category.model';
import { categorySelectors } from '../../../../store/selectors/category.selectors';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-events-settings',
  templateUrl: './events-settings.component.html',
  styleUrls: ['./events-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsSettingsComponent implements OnInit {
  sourceProducts: Category[] = [];

  targetProducts: Category[] = [];

  categories$ = this.store.select(categorySelectors.all);

  constructor(private store: Store) {}

  ngOnInit() {}
}

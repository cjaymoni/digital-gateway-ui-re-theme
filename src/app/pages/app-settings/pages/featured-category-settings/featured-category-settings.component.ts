import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, map, Observable, of, withLatestFrom } from 'rxjs';
import {
  MAX_FEATURED_CATEGORIES,
  PrimeNgAlerts,
} from 'src/app/config/app-config';
import { Category } from 'src/app/models/category.model';
import { BlockService } from 'src/app/services/blocks.service';
import { AppAlertService } from 'src/app/shared-ui-modules/alerts/service/app-alert.service';
import { categorySelectors } from 'src/app/store/selectors/category.selectors';
import { ThemeSettingsStore } from 'src/app/store/theme-settings.state';

@Component({
  selector: 'app-featured-category-settings',
  templateUrl: './featured-category-settings.component.html',
  styleUrls: ['./featured-category-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedCategorySettingsComponent implements OnInit {
  categoriesSelected$: Observable<Category[]> = of([]);

  unselectedCategories$: BehaviorSubject<Category[]> = new BehaviorSubject(
    new Array(0)
  );

  categories$ = this.store.select(categorySelectors.all).pipe(
    withLatestFrom(this.categoriesSelected$.pipe(map(sc => sc.map(c => c.id)))),
    map(([all, selected]) => {
      console.log(all, selected);

      const filtered = (all as Category[]).filter(
        c => !selected.includes(c.id)
      );
      return filtered;
    })
  );

  selectedArray: Category[] = [];

  categorySubscription$ = this.themeStore.featuredCategoryArray$
    .pipe(
      withLatestFrom(
        this.categoriesSelected$,
        this.store.select(categorySelectors.all)
      ),
      map(([fc, sc, all]) => {
        const newArray = [...sc].concat([...fc].map(c => c.category));
        this.selectedArray = newArray;
        // const unselected = ;
        const selected = newArray.map(c => c.id);
        const filtered = (all as Category[]).filter(
          c => !selected.includes(c.id)
        );
        this.unselectedCategories$.next(filtered);
      })
    )
    .subscribe();

  constructor(
    private store: Store,
    private themeStore: ThemeSettingsStore,
    private alert: AppAlertService,
    private blockService: BlockService
  ) {}

  ngOnInit() {}

  ngOnDestroy(): void {
    this.categorySubscription$.unsubscribe();
  }

  checkNumberAndMove(event: any) {
    if (this.selectedArray.length > MAX_FEATURED_CATEGORIES) {
      const toKeep = this.selectedArray.slice(0, 8);
      const removed = this.selectedArray.slice(8);

      this.selectedArray.pop();
      this.selectedArray = [...toKeep];
      this.unselectedCategories$.next(removed);

      this.alert.showToast(
        'You cannot add more than ' + MAX_FEATURED_CATEGORIES + ' items',
        PrimeNgAlerts.ERROR
      );
    }
  }

  saveChanges() {
    // this.selectedArray
    console.log('save changes');

    this.blockService
      .saveFeaturedCategories(this.selectedArray)
      .subscribe(_ => this.alert.showToast('Saved Successfully'));
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, Observable, of } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { categorySelectors } from 'src/app/store/selectors/category.selectors';

@Component({
  selector: 'app-category-autocomplete',
  templateUrl: './category-autocomplete.component.html',
  styleUrls: ['./category-autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryAutocompleteComponent implements OnInit {
  @Input() selectedCategory = new FormControl();

  categories$: Observable<any[]> = of([]);

  constructor(private store: Store) {}

  ngOnInit(): void {}

  searchCategory(query: string) {
    this.categories$ = this.store.select(categorySelectors.all).pipe(
      map((categories: Category[]) => {
        const categoriesArray = [...categories];
        return categoriesArray.map(cat => {
          return {
            ...cat,
            label: cat.name,
          };
        });
      })
    );
  }
}

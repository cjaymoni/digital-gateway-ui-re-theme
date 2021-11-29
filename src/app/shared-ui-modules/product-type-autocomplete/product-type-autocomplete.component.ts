import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, Observable, of } from 'rxjs';
import { ProductType } from 'src/app/models/product-ad.model';
import { productTypeSelectors } from 'src/app/store/selectors/product-type.selectors';

@Component({
  selector: 'app-product-type-autocomplete',
  templateUrl: './product-type-autocomplete.component.html',
  styleUrls: ['./product-type-autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductTypeAutocompleteComponent implements OnInit {
  @Input() selectedProductType = new FormControl();

  productTypes$: Observable<any[]> = of([]);

  constructor(private store: Store) {}

  ngOnInit(): void {}

  searchProductType(query: string) {
    this.productTypes$ = this.store.select(productTypeSelectors.all).pipe(
      map((productTypes: ProductType[]) => {
        const productTypeArray = [...productTypes];
        return productTypeArray.map(productType => {
          return {
            ...productType,
            label: productType.name,
          };
        });
      })
    );
  }
}

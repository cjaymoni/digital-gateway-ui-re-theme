import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, Observable, of } from 'rxjs';
import { District } from 'src/app/models/district.model';
import { districtSelectors } from 'src/app/store/selectors/district.selectors';

@Component({
  selector: 'app-district-auto-complete',
  templateUrl: './district-auto-complete.component.html',
  styleUrls: ['./district-auto-complete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DistrictAutoCompleteComponent implements OnInit {
  @Input() selectedDistrict = new FormControl();

  distrcits$: Observable<any[]> = of([]);

  constructor(private store: Store) {}

  ngOnInit(): void {}

  searchDistrict(query: string) {
    this.distrcits$ = this.store.select(districtSelectors.all).pipe(
      map((districts: District[]) => {
        const districtArray = [...districts];
        return districtArray.map(district => {
          return {
            ...district,
            label: district.name,
          };
        });
      })
    );
  }
}

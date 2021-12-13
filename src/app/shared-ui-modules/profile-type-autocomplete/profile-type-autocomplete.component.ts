import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, map, of } from 'rxjs';
import { profileTypeSelectors } from 'src/app/store/selectors/profile-type.selectors';
import { ProfileType } from '../../models/user-auth.model';

@Component({
  selector: 'app-profile-type-autocomplete',
  templateUrl: './profile-type-autocomplete.component.html',
  styleUrls: ['./profile-type-autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileTypeAutocompleteComponent implements OnInit {
  @Input() selectedProfileType = new FormControl();

  profileTypes$: Observable<any[]> = of([]);

  constructor(private store: Store) {}

  ngOnInit() {}

  searchProfileType(query: string) {
    this.profileTypes$ = this.store.select(profileTypeSelectors.all).pipe(
      map((profileTypes: ProfileType[]) => {
        const profileTypeArray = [...profileTypes];
        return profileTypeArray.map(profileType => {
          return {
            ...profileType,
            label: profileType.name,
          };
        });
      })
    );
  }
}

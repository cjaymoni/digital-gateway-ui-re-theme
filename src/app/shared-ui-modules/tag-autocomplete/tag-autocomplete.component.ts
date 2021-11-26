import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { BehaviorSubject, filter, map, switchMap, take } from 'rxjs';
import { slugify } from 'src/app/helpers/app.helper.functions';
import { Tag } from 'src/app/models/tag.model';
import { tagActions } from 'src/app/store/actions/tag.actions';
import { tagSelectors } from 'src/app/store/selectors/tag.selectors';

@Component({
  selector: 'app-tag-autocomplete',
  templateUrl: './tag-autocomplete.component.html',
  styleUrls: ['./tag-autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagAutocompleteComponent implements OnInit {
  @Input() selectedTags = new FormControl();
  searchQuery$ = new BehaviorSubject('');

  tags$ = this.searchQuery$.pipe(
    filter(query => !!query),
    switchMap(query =>
      this.store.select(tagSelectors.getByName(query)).pipe(
        map((tags: Tag[]) => {
          const tagsArray = [...tags];
          return tagsArray.map(tag => {
            return {
              ...tag,
              label: tag.name,
            };
          });
        })
      )
    )
  );

  constructor(private store: Store, private actions$: Actions) {}

  ngOnInit(): void {}

  searchTag(query: string) {
    this.searchQuery$.next(query);
  }

  addNewTag() {
    const typedQuery = this.searchQuery$.getValue();

    this.actions$
      .pipe(
        ofType(tagActions.addTagSuccessful),
        take(1),
        map(({ tag }) => this.addTagToSelected(tag))
      )
      .subscribe();

    this.store.dispatch(
      tagActions.addTag({
        tag: {
          name: typedQuery,
          slug: slugify(typedQuery),
        },
      })
    );
  }

  addTagToSelected(tag: Tag) {
    const currentValue: any[] = (this.selectedTags.value as any[]) || [];
    this.selectedTags.patchValue(
      currentValue.concat([
        {
          ...tag,
          label: tag.name,
        },
      ])
    );
  }
}

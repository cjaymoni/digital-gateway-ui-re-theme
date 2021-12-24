import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, Observable, of } from 'rxjs';
import { Forum } from 'src/app/models/forum.model';
import { forumSelectors } from '../../store/selectors/forum.selectors';

@Component({
  selector: 'app-forum-autocomplete',
  templateUrl: './forum-autocomplete.component.html',
  styleUrls: ['./forum-autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForumAutocompleteComponent implements OnInit {
  @Input() selectedForum = new FormControl();

  forums$: Observable<any[]> = of([]);

  constructor(private store: Store) {}

  ngOnInit() {}

  searchForum(query: string) {
    this.forums$ = this.store.select(forumSelectors.all).pipe(
      map((forums: Forum[]) => {
        const forumsArray = [...forums];
        return forumsArray.map(forum => {
          return {
            ...forum,
            label: forum.name,
          };
        });
      })
    );
  }
}

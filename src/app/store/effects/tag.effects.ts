import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, switchMap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Tag } from 'src/app/models/tag.model';
import { TagService } from 'src/app/services/tag.service';
import { tagActions } from '../actions/tag.actions';

@Injectable()
export class TagEffects {
  loadTags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(tagActions.fetch),
      switchMap(() =>
        this.tagService.getResources().pipe(
          map((tags: Tag[]) =>
            tagActions.fetchSuccessful({
              tags,
            })
          ),
          catchError(() => of(tagActions.fetchError))
        )
      )
    )
  );

  addTags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(tagActions.addTag),
      switchMap(({ tag }) =>
        this.tagService.storeResource(tag).pipe(
          map((tag: any) =>
            tagActions.addTagSuccessful({
              tag,
            })
          ),
          catchError(() => of(tagActions.fetchError))
        )
      )
    )
  );

  addTagsSuccessful$ = createEffect(() =>
    this.actions$.pipe(
      ofType(tagActions.fetch),
      switchMap(() =>
        this.tagService.getResources().pipe(
          map((tags: Tag[]) =>
            tagActions.fetchSuccessful({
              tags,
            })
          ),
          catchError(() => of(tagActions.fetchError))
        )
      )
    )
  );

  constructor(private actions$: Actions, private tagService: TagService) {}
}

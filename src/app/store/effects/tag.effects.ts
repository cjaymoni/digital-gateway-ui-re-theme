import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of, switchMap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Article } from 'src/app/models/article.model';
import { Tag } from 'src/app/models/tag.model';
import { ArticleService } from 'src/app/pages/articles/services/articles.service';
import { TagService } from 'src/app/services/tag.service';
import { articleActions } from '../actions/article.actions';
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

  constructor(private actions$: Actions, private tagService: TagService) {}
}

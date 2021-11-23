import { EntityAdapter } from '@ngrx/entity';
import { createSelector, MemoizedSelector } from '@ngrx/store';
import { FeatureSelector } from '@ngrx/store/src/feature_creator_models';

export class DefaultAdapterSelectors {
  constructor(
    protected entityAdapter: EntityAdapter<any>,
    protected state: MemoizedSelector<any, any, any>
  ) {}

  private entitySelectors = this.entityAdapter.getSelectors();

  selectIds = this.entitySelectors.selectIds;

  // select the dictionary of user entities
  entities = this.entitySelectors.selectEntities;

  // select the array of users
  private selectAll = this.entitySelectors.selectAll;

  // select the total user count
  total = this.entitySelectors.selectTotal;

  getById = (id: number) =>
    createSelector(this.all, (all: any[]) => all.find(one => one.id === id));

  getByName = (name: string) =>
    createSelector(this.all, (all: any[]) =>
      all.filter(one =>
        one?.name
          ?.replace(/\s/g, '')
          .toLowerCase()
          .includes(name.replace(/\s/g, '').toLowerCase())
      )
    );

  all = createSelector(this.state, this.selectAll);
}

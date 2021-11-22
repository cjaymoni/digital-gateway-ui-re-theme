import { EntityAdapter } from '@ngrx/entity';
import { createSelector } from '@ngrx/store';

export class DefaultAdapterSelectors {
  constructor(protected entityAdapter: EntityAdapter<any>) {}

  private entitySelectors = this.entityAdapter.getSelectors();

  ids = this.entitySelectors.selectIds;

  // select the dictionary of user entities
  entities = this.entitySelectors.selectEntities;

  // select the array of users
  all = this.entitySelectors.selectAll;

  // select the total user count
  total = this.entitySelectors.selectTotal;

  getById = (id: number) =>
    createSelector(this.all, (all: any[]) => all.find(one => one.id === id));

  getByName = (name: string) =>
    createSelector(this.all, (all: any[]) =>
      all.find(one => one.name === name)
    );
}

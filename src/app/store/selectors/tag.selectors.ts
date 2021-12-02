import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeatureNamesForStore, TagType } from 'src/app/config/app-config';
import { Tag } from 'src/app/models/tag.model';
import { tagEntityAdapter } from '../reducers/tag.reducers';
import { DefaultAdapterSelectors } from './default.adapter.selectors';

const tagFeatureSelector = createFeatureSelector(FeatureNamesForStore.Tag);

class TagSelectors extends DefaultAdapterSelectors {
  constructor() {
    super(tagEntityAdapter, tagFeatureSelector);
  }

  filterTags = (tagType: TagType) =>
    createSelector(this.all, (tags: Tag[]) =>
      tags.filter(tag => tag.tag_type === tagType)
    );

  forumTags = this.filterTags(TagType.forum);
  productTags = this.filterTags(TagType.product);
  articleTags = this.filterTags(TagType.article);
  adTags = this.filterTags(TagType.ad);

  getTagByName = (name: string, tagType: TagType) => {
    const listToUse = this.filterTags(tagType);
    return createSelector(listToUse, (all: any[]) =>
      all.filter(one =>
        one?.name
          ?.replace(/\s/g, '')
          .toLowerCase()
          .includes(name.replace(/\s/g, '').toLowerCase())
      )
    );
  };
}

export const tagSelectors = new TagSelectors();

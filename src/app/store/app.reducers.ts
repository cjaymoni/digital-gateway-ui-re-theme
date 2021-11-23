import { routerReducer } from '@ngrx/router-store';
import { FeatureNamesForStore } from '../config/app-config';
import { articleReducer } from './reducers/article.reducers';
import { categoryReducer } from './reducers/category.reducers';
import { menuItemReducer } from './reducers/menu-items.reducers';
import { tagReducer } from './reducers/tag.reducers';
import { userAuthReducer } from './reducers/user-auth.reducers';

export const appReducersMap = {
  [FeatureNamesForStore.User]: userAuthReducer,
  [FeatureNamesForStore.Router]: routerReducer,
  [FeatureNamesForStore.Article]: articleReducer,
  [FeatureNamesForStore.Tag]: tagReducer,
  [FeatureNamesForStore.Category]: categoryReducer,
  [FeatureNamesForStore.Menu]: menuItemReducer,
};

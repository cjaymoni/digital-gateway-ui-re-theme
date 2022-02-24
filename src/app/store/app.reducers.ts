import { routerReducer } from '@ngrx/router-store';
import { FeatureNamesForStore } from '../config/app-config';
import { articleReducer } from './reducers/article.reducers';
import { categoryReducer } from './reducers/category.reducers';
import { digitalLinkReducer } from './reducers/digital-link.reducers';
import { districtReducer } from './reducers/district.reducer';
import { forumPostReducer } from './reducers/forum-post.reducers';
import { forumReducer } from './reducers/forum.reducer';
import { menuItemReducer } from './reducers/menu-items.reducers';
import { multiMediaReducer } from './reducers/multimedia.reducers';
import { productAdReducer } from './reducers/product-ad.reducers';
import { productTypeReducer } from './reducers/product-types.reducers';
import { profileTypeReducer } from './reducers/profile-types.reducers';
import { socialMediaReducer } from './reducers/socialmedia.reducers';
import { tagReducer } from './reducers/tag.reducers';
import { userAuthReducer } from './reducers/user-auth.reducers';
import { userProfileReducer } from './reducers/user-profile.reducers';
import { userListReducer } from './reducers/users-list.reducers';

export const appReducersMap = {
  [FeatureNamesForStore.User]: userAuthReducer,
  [FeatureNamesForStore.Router]: routerReducer,
  [FeatureNamesForStore.Article]: articleReducer,
  [FeatureNamesForStore.Tag]: tagReducer,
  [FeatureNamesForStore.Category]: categoryReducer,
  [FeatureNamesForStore.Menu]: menuItemReducer,
  [FeatureNamesForStore.ProductAd]: productAdReducer,
  [FeatureNamesForStore.Districts]: districtReducer,
  [FeatureNamesForStore.ProductType]: productTypeReducer,
  [FeatureNamesForStore.Forum]: forumReducer,
  [FeatureNamesForStore.ForumPost]: forumPostReducer,
  [FeatureNamesForStore.ProfileType]: profileTypeReducer,
  [FeatureNamesForStore.UserProfile]: userProfileReducer,
  [FeatureNamesForStore.UsersList]: userListReducer,
  [FeatureNamesForStore.MultiMedia]: multiMediaReducer,
  [FeatureNamesForStore.SocialMedia]: socialMediaReducer,
  [FeatureNamesForStore.DigitalLink]: digitalLinkReducer,
};

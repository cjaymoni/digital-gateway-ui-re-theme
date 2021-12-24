import { environment } from 'src/environments/environment';

export const CategoryEndpoint = environment.API_URL + 'categories/';
export const TagEndpoint = environment.API_URL + 'tags/';
export const ArticlesEndpoint = environment.API_URL + 'articles/';
export const ProductAdEndpoint = environment.API_URL + 'ads/';
export const DistrictEndpoint = environment.API_URL + 'districts/';
export const ProductTypeEndpoint = environment.API_URL + 'product-types/';
export const ForumEndpoint = environment.API_URL + 'forums/';
export const ForumPostEndpoint = environment.API_URL + 'forum-posts/';
export const ResourceEndpoint = environment.API_URL + 'uploads/';
export const FeaturedCategoriesEndpoint =
  environment.API_URL + 'categoryblocks/';
export const HighlightArticlesEndpoint =
  environment.API_URL + 'articleblocks/?block=1';

export const EventsEndpoint = environment.API_URL + 'articleblocks/?block=3';
export const CommentsEndpoint = environment.API_URL + 'comments/';
export const SignUpEndpoint = environment.API_URL + 'register/';
export const ProfileTypeEndpoint = environment.API_URL + 'profile-types/';
export const UserProfileEndpoint = environment.API_URL + 'profile/';
export const SearchEndpoint = environment.API_URL + 'fts/?q={query}';
export const BlocksEndpoint = environment.API_URL + 'blocks/{blockId}';
export const ArticleBlockEndpoint = environment.API_URL + 'blocks/1/articles/';
export const EventBlockEndpoint = environment.API_URL + 'blocks/3/articles/';
export const CategoryBlockEndpoint =
  environment.API_URL + 'blocks/2/categories/';
export const LogoutEndpoint = environment.API_URL + 'logout/';

export const LoginEndpoint = environment.API_URL + 'login/';

import { Injectable } from '@angular/core';
import { Gtag } from 'angular-gtag';
import { Article } from '../models/article.model';
import { DigitalLink } from '../models/digital-link.model';
import { Forum, ForumPost } from '../models/forum.model';
import { ProductAd } from '../models/product-ad.model';
import { Tag } from '../models/tag.model';
import { Upload } from '../models/uploads.model';

const enum ANALYTICS_EVENTS {
  CommentOnForum = 'CommentOnForum',
  CommentOnForumPost = 'CommentOnForumPost',
  CommentOnComment = 'CommentOnComment',
  AddForumTopic = 'AddForumTopic',
  LikeComment = 'LikeComment',
  DislikeComment = 'DislikeComment',
  LikePost = 'LikePost',
  DislikePost = 'DislikePost',
  GotoFeaturedArticle = 'GotoFeaturedArticle',
  GotoFeaturedCategory = 'GotoFeaturedCategory',
  GotoDirectLink = 'GotoDirectLink',
  GotoCurrentOpportunity = 'GotoCurrentOpportunity',
  Signup = 'Signup',
  SignIn = 'SignIn',
  WatchMultimedia = 'WatchMultimedia',
  DownloadReport = 'DownloadReport',
  ArticleSearch = 'ArticleSearch',
  GeneralSearch = 'GeneralSearch',
  ReadArticleFromTag = 'ReadArticleFromTag',
  LoadArticlesFromTag = 'LoadArticlesFromTag',
  PlayMultimedia = 'PlayMultimedia',
}
const enum ANALYTICS_EVENTS_TYPES {
  Engagement = 'Engagement',
  Register = 'Register',
  Login = 'Login',
  Search = 'Search',
}

@Injectable({
  providedIn: 'root',
})
export class GoogleAnalyticsService {
  constructor(private gtag: Gtag) {}

  Pages = {
    homepageOpened: () => {
      this.gtag.pageview({
        page_title: 'Homepage',
      });
    },
    articleOpened: (article: Article) => {
      this.gtag.pageview({
        page_title: `Article - ${article.title}`,
        article_id: article.id,
      });
    },
    marketAdListOpened: () => {
      this.gtag.pageview({
        page_title: `Product Ad List`,
      });
    },
    marketAdOpened: (ad: ProductAd) => {
      this.gtag.pageview({
        page_title: `View Product Ad`,
        ad_id: ad.id,
      });
    },
    forumListOpened: () => {
      this.gtag.pageview({
        page_title: `Forum List`,
      });
    },
    forumOpened: (forum: Forum) => {
      this.gtag.pageview({
        page_title: `Forum Page`,
        forum_id: forum.id,
      });
    },
    forumTopicOpened: (topic: ForumPost) => {
      this.gtag.pageview({
        page_title: `Forum Topic Page`,
        forum_topic_id: topic.id,
      });
    },
    aboutUsPage: () => {
      this.gtag.pageview({
        page_title: `About Us`,
      });
    },
  };

  Events = {
    openedFeaturedArticle: (id: any) => {
      this.gtag.event(ANALYTICS_EVENTS.GotoFeaturedArticle, {
        event_category: ANALYTICS_EVENTS_TYPES.Engagement,
        event_label: `Opened a featured article`,
        article_id: id,
      });
    },

    openedFeaturedCategory: (id: any) => {
      this.gtag.event(ANALYTICS_EVENTS.GotoFeaturedCategory, {
        event_category: ANALYTICS_EVENTS_TYPES.Engagement,
        event_label: `Opened a featured category`,
        category_id: id,
      });
    },

    signUp: () => {
      this.gtag.event(ANALYTICS_EVENTS.Signup, {
        event_category: ANALYTICS_EVENTS_TYPES.Register,
        event_label: 'User registered',
      });
    },

    login: () => {
      this.gtag.event(ANALYTICS_EVENTS.SignIn, {
        event_category: ANALYTICS_EVENTS_TYPES.Login,
        event_label: 'Logged in',
      });
    },

    search: (searchTerm: string) => {
      this.gtag.event(ANALYTICS_EVENTS.SignIn, {
        event_category: ANALYTICS_EVENTS_TYPES.Search,
        searchTerm,
      });
    },

    openedTagArticles: (tag: Tag) => {
      this.gtag.event(ANALYTICS_EVENTS.LoadArticlesFromTag, {
        event_category: ANALYTICS_EVENTS_TYPES.Engagement,
        event_label: `Click on Featured Tag`,
        opened_tag_id: tag.id,
      });
    },

    readTagArticle: (tag: Tag, article: Article) => {
      this.gtag.event(ANALYTICS_EVENTS.ReadArticleFromTag, {
        event_category: ANALYTICS_EVENTS_TYPES.Engagement,
        event_label: `Read Featured Tag Article`,
        tag_id: tag.id,
        article_id: article.id,
      });
    },

    commentOnForumPost: (forumPost: ForumPost) => {
      this.gtag.event(ANALYTICS_EVENTS.CommentOnForumPost, {
        event_category: ANALYTICS_EVENTS_TYPES.Engagement,
        event_label: `Comment on Forum Post`,
        forum_post_id: forumPost.id,
      });
    },

    likeForumPost: (forumPost: ForumPost) => {
      this.gtag.event(ANALYTICS_EVENTS.CommentOnForumPost, {
        event_category: ANALYTICS_EVENTS_TYPES.Engagement,
        event_label: `Like Forum Post`,
        forum_post_id: forumPost.id,
      });
    },

    dislikeForumPost: (forumPost: ForumPost) => {
      this.gtag.event(ANALYTICS_EVENTS.CommentOnForumPost, {
        event_category: ANALYTICS_EVENTS_TYPES.Engagement,
        event_label: `Dislike Forum Post`,
        forum_post_id: forumPost.id,
      });
    },

    likeComment: () => {
      this.gtag.event(ANALYTICS_EVENTS.LikeComment, {
        event_category: ANALYTICS_EVENTS_TYPES.Engagement,
        event_label: `Like Comment`,
      });
    },

    dislikeComment: () => {
      this.gtag.event(ANALYTICS_EVENTS.DislikeComment, {
        event_category: ANALYTICS_EVENTS_TYPES.Engagement,
        event_label: `Dislike Comment`,
      });
    },

    downloadResource: (resource: Upload) => {
      this.gtag.event(ANALYTICS_EVENTS.DownloadReport, {
        event_category: ANALYTICS_EVENTS_TYPES.Engagement,
        event_label: `Download Report`,
        resource_id: resource.id,
      });
    },

    gotoDirectLink: (link: DigitalLink) => {
      this.gtag.event(ANALYTICS_EVENTS.GotoDirectLink, {
        event_category: ANALYTICS_EVENTS_TYPES.Engagement,
        event_label: `Goto Direct Link`,
        direct_link_id: link.id,
      });
    },

    gotoCurrentOpportunities: (article: Article) => {
      this.gtag.event(ANALYTICS_EVENTS.GotoCurrentOpportunity, {
        event_category: ANALYTICS_EVENTS_TYPES.Engagement,
        event_label: `Goto Current Opportunity`,
        opportunity_id: article.id,
      });
    },

    playMultimedia: () => {
      this.gtag.event(ANALYTICS_EVENTS.PlayMultimedia, {
        event_category: ANALYTICS_EVENTS_TYPES.Engagement,
        event_label: `Play multimedia`,
      });
    },
  };
}

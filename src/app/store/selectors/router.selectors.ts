import { Params } from '@angular/router';
import { getSelectors } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeatureNamesForStore } from 'src/app/config/app-config';

export const {
  selectCurrentRoute, // select the current route
  selectFragment, // select the current route fragment
  selectQueryParams, // select the current route query params
  selectQueryParam, // factory function to select a query param
  selectRouteParams, // select the current route params
  selectRouteParam, // factory function to select a route param
  selectRouteData, // select the current route data
  selectUrl, // select the current url
} = getSelectors();

const routerFeatureSelector = createFeatureSelector(
  FeatureNamesForStore.Router
);

export const selectRouteNestedParams = createSelector(
  routerFeatureSelector,
  (router: any) => {
    let currentRoute = router?.state?.root;
    let params: Params = {};
    while (currentRoute?.firstChild) {
      currentRoute = currentRoute.firstChild;
      params = {
        ...params,
        ...currentRoute.params,
      };

      const children = currentRoute.children;

      if (children.length) {
        children.forEach((child: any) => {
          params = {
            ...params,
            ...child.params,
          };
        });
      }
    }
    return params;
  }
);

export const selectRouteNestedParam = (param: string) =>
  createSelector(selectRouteNestedParams, params => params && params[param]);

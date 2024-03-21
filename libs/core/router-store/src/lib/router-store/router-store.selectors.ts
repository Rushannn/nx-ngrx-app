import { getRouterSelectors } from "@ngrx/router-store";

export const {
  selectQueryParams,
  selectCurrentRoute,
  selectRouteParams,
  selectFragment,
  selectQueryParam,
  selectRouteData,
  selectRouteDataParam,
  selectRouteParam,
  selectTitle,
  selectUrl
} = getRouterSelectors();

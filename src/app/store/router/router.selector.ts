import { RouterReducerState } from "@ngrx/router-store";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RouterStateUrl } from "./custom-serializer";

export const getRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');

export const getCurrentRoute = createSelector(getRouterState, router => {
  return router.state;
});

export const selectRouterParamsAndId = createSelector(
  getRouterState,
  (routerState) => routerState.state.params
);

export const selectRouterId = createSelector(
  selectRouterParamsAndId,
  (params) => params['id']
);

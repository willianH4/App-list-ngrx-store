import { createAction, props } from "@ngrx/store";

export const SET_LOADING_ACTION = '[shared state] set loading spinner';
export const SET_ERROR_MESSAGE = '[Shared state] set error message';

export const setLoadingSpinner = createAction(SET_LOADING_ACTION,
  props<{ status: boolean }>()
);

export const setErrroMessage = createAction(
  SET_ERROR_MESSAGE,
  props<{ message: string }>()
);

import { createReducer, on } from "@ngrx/store";
import { SharedState, initialState } from "./shared.store";
import { setErrroMessage, setLoadingSpinner } from "./shared.actions";

const _sharedReducer = createReducer(
  initialState,
  on(setLoadingSpinner, (state, action) => {
    return {
      ...state,
      showLoading: action.status
    }
  }),
  on(setErrroMessage, (state, action) => {
    return {
      ...state,
      errorMessage: action.message
    }
  })
);

export function SharedReducer(state: any, action:any) {
  return _sharedReducer(state, action);
}

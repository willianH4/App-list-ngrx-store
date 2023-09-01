import { createReducer } from "@ngrx/store";
import { AuthState, initialState } from "./auth.state";

const _authReducer = createReducer(initialState);

export function AuthReducer(state: AuthState, action: any) {
  return _authReducer(state, action);
}

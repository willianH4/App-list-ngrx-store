import { createReducer } from "@ngrx/store";
import { PostsState, initialState } from "./post.state";

const _postsReducer = createReducer(initialState);

export function postsReducer(state: any, action: any) {
  return _postsReducer(state, action);
}

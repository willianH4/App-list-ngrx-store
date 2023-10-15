import { createReducer, on } from "@ngrx/store";
import { PostsState, initialState, postsAdapter } from "./post.state";
import { addPostSuccess, deletePost, deletePostSuccess, loadPostSuccess, updatePost, updatePostSuccess } from "./post.action";
import { Post } from "src/app/data/models/post.model";

const _postsReducer = createReducer(initialState,
  on(addPostSuccess, (state, action) => {
    return postsAdapter.addOne(action.post, { ...state, count: state.count + 1 })
  }),
  on(updatePostSuccess, (state: PostsState, action:any) => {
    return postsAdapter.updateOne(action.post, state);
  }),
  on(deletePostSuccess, (state: PostsState, { id }) => {
    return postsAdapter.removeOne(id!.toString(), state)
  }),
  on(loadPostSuccess, (state, action) => {
    return postsAdapter.setAll(action.post, { ...state, count: state.count + 1 });
  })
);

export function postsReducer(state: any, action: any) {
  return _postsReducer(state, action);
}

import { createReducer, on } from "@ngrx/store";
import { PostsState, initialState } from "./post.state";
import { addPostSuccess, deletePost, deletePostSuccess, loadPostSuccess, updatePost, updatePostSuccess } from "./post.action";
import { Post } from "src/app/data/models/post.model";

const _postsReducer = createReducer(initialState,
  on(addPostSuccess, (state, action) => {
    const post = {...action.post};
    return {
      ...state,
      posts: [...state.posts, post]
    };
  }),
  on(updatePostSuccess, (state: PostsState, action:any) => {
    const updatePost = state.posts.map((post) => {
      return action.post.id === post.id ? action.post : post
    });
    return {
      ...state,
      posts: updatePost,
    }
  }),
  on(deletePostSuccess, (state: PostsState, { id }) => {
    const updatedPosts = state.posts.filter(post => {
      return post.id !== id;
    });
    return {
      ...state,
      posts: updatedPosts
    };
  }),
  on(loadPostSuccess, (state, action) => {
    return {
      ...state,
      posts: action.post
    }
  })
);

export function postsReducer(state: any, action: any) {
  return _postsReducer(state, action);
}

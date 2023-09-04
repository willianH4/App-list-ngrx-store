import { createReducer, on } from "@ngrx/store";
import { PostsState, initialState } from "./post.state";
import { addPost, deletePost, updatePost } from "./post.action";
import { Post } from "src/app/data/models/post.model";

const _postsReducer = createReducer(initialState,
  on(addPost, (state, action) => {
    const post = {...action.post};
    post.id = state.posts.length +1;
    return {
      ...state,
      posts: [...state.posts, post]
    };
  }),
  on(updatePost, (state: PostsState, action:any) => {
    const updatePost = state.posts.map((post: Post) => {
      return action.post.id === post.id ? action.post : post
    });
    return {
      ...state,
      posts: updatePost,
    }
  }),
  on(deletePost, (state: PostsState, { id }) => {
    const updatedPosts = state.posts.filter(post => {
      return post.id !== id;
    });
    return {
      ...state,
      posts: updatedPosts
    };
  })
);

export function postsReducer(state: any, action: any) {
  return _postsReducer(state, action);
}

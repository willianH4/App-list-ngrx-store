import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PostsState } from "./post.state";
import { Post } from "src/app/data/models/post.model";
import { getCurrentRoute } from "src/app/store/router/router.selector";
import { RouterStateUrl } from "src/app/store/router/custom-serializer";

export const POST_STATE_NAME = 'posts';

const getPostsState = createFeatureSelector<PostsState>(POST_STATE_NAME);

export const getPosts = createSelector(getPostsState, state => {
  return state.posts;
});


export const getPostById = createSelector(getPostsState, getCurrentRoute, ({ posts }, route: RouterStateUrl) => {
  return posts.find((post: Post) => post.id === route.params['id']);
});

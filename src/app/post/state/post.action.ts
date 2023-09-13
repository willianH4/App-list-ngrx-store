import { createAction, props } from "@ngrx/store";
import { Post } from "../../data/models/post.model";

export const ADD_POST_ACTION = '[post page] add post';
export const UPDATE_POST_ACTION = '[posts page] update post';
export const DELETE_POST_ACTION = '[posts page] delete post';
export const LOAD_POST = '[posts page] load post';
export const LOAD_POST_SUCCESS = '[posts page] load post success';

export const addPost = createAction(ADD_POST_ACTION, props<{post: Post}>());

export const updatePost = createAction(UPDATE_POST_ACTION, props<{post: Post }>());

export const deletePost = createAction(DELETE_POST_ACTION, props<{id?: number}>());

export const loadPost = createAction(LOAD_POST);

export const loadPostSuccess = createAction(
  LOAD_POST_SUCCESS,
  props<{ post: Post[] }>()
);

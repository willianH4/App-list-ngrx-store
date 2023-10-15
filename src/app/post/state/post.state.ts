import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { Post } from "src/app/data/models/post.model"

export interface PostsState extends EntityState<Post> {}

export const postsAdapter = createEntityAdapter<Post>();

export const initialState: PostsState = postsAdapter.getInitialState();

export const postsSelectors = postsAdapter.getSelectors();

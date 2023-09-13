import { Post } from "src/app/data/models/post.model"

export interface PostsState {
  posts: Post[];
}

export const initialState: PostsState = {
  posts: [],
};

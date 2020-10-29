import { Post } from "../db"

export const ADD_POST = 'ADD_POST'
export const BULK_ADD_POSTS= 'BULK_ADD_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const DELETE_POST = 'DELETE_POST'

interface IAddPostAction {
  type: typeof ADD_POST
  payload: {
    post: Post
  }
}

interface IBulkAddPosts {
  type: typeof BULK_ADD_POSTS
  payload: {
    posts: Post[]
  }
}

interface IUpdatePostAction {
  type: typeof UPDATE_POST
  payload: {
    post: Post
  }
}

interface IDeletePostAction {
  type: typeof DELETE_POST
  payload: {
    id: string
  }
}

export type PostActionTypes = IAddPostAction | IUpdatePostAction | IDeletePostAction | IBulkAddPosts
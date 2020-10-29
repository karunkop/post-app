import { ActionCreator } from "../types";
import db from "../db";
import { BULK_ADD_CATEGORIES } from "../action-types/categoryActionTypes";
import { BULK_ADD_POSTS } from "../action-types/postActionTypes";

const loadFromDatabase = (): ActionCreator => async (dispatch, getState) => {
  const categories = await db.getAllCategories();
  const posts = await db.getAllPosts();

  dispatch({
    type: BULK_ADD_CATEGORIES,
    payload: {
      categories
    }
  })

  dispatch({
    type: BULK_ADD_POSTS,
    payload: {
      posts
    }
  })
}

export default loadFromDatabase
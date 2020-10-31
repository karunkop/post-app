import db from "../db";
import { ADD_POST } from "../action-types/postActionTypes";

const addPost= (post) => async (dispatch, getState) => {
  await db.addPost(post);

  console.log(post)
  dispatch({
    type: ADD_POST,
    payload: {
      post
    }
  })
}

export default addPost
import db from "../db";
import { DELETE_POST } from "../action-types/postActionTypes";

const deletePost= (post) => async (dispatch, getState) => {
  await db.deletePost(post.id);
  dispatch({
    type: DELETE_POST,
    payload: {
      id: post.id
    }
  })
}

export default deletePost
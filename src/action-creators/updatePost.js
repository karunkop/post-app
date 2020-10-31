import db from "../db";
import { UPDATE_POST } from "../action-types/postActionTypes";

const updatePost= (post) => async (dispatch, getState) => {
  await db.updatePost(post.id, post);
  dispatch({
    type: UPDATE_POST,
    payload: {
      post
    }
  })
}

export default updatePost
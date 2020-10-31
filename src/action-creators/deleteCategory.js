import db from "../db";
import { DELETE_CATEGORY } from "../action-types/categoryActionTypes";

const deleteCategory = (category) => async (dispatch, getState) => {
  await db.deleteCategory(category.id);
  dispatch({
    type: DELETE_CATEGORY,
    payload: {
      id: category.id
    }
  })
}

export default deleteCategory
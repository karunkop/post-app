import db from "../db";
import { UPDATE_CATEGORY } from "../action-types/categoryActionTypes";

const updateCategory = (category) => async (dispatch, getState) => {
  await db.updateCategory(category.id, category);
  dispatch({
    type: UPDATE_CATEGORY,
    payload: {
      category
    }
  })
}

export default updateCategory
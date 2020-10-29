import { ActionCreator } from "../types";
import db, { Category } from "../db";
import { UPDATE_CATEGORY } from "../action-types/categoryActionTypes";

const updateCategory = (category: Category): ActionCreator => async (dispatch, getState) => {
  await db.updateCategory(category.id, category);
  dispatch({
    type: UPDATE_CATEGORY,
    payload: {
      category
    }
  })
}

export default updateCategory
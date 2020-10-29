import { ActionCreator } from "../types";
import db, { Category } from "../db";
import { ADD_CATEGORY } from "../action-types/categoryActionTypes";

const addCategory = (category: Category): ActionCreator => async (dispatch, getState) => {
  await db.addCategory(category);
  dispatch({
    type: ADD_CATEGORY,
    payload: {
      category
    }
  })
}

export default addCategory
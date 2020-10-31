import { ADD_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY } from '../action-types/categoryActionTypes'

export const addCategoryAction = (category) => {
  return {
    type: ADD_CATEGORY,
    payload: {
      category
    }
  }
}

export const updateCategoryAction = (category) => {
  return {
    type: UPDATE_CATEGORY,
    payload: {
      category
    }
  }
}

export const deleteCategoryAction = (id) => {
  return {
    type: DELETE_CATEGORY,
    payload: {
      id
    }
  }
}
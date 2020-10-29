import { CategoryActionTypes, ADD_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY } from '../action-types/categoryActionTypes'
import { Category } from '../db'

export const addCategoryAction = (category: Category): CategoryActionTypes => {
  return {
    type: ADD_CATEGORY,
    payload: {
      category
    }
  }
}

export const updateCategoryAction = (category: Category): CategoryActionTypes => {
  return {
    type: UPDATE_CATEGORY,
    payload: {
      category
    }
  }
}

export const deleteCategoryAction = (id: string): CategoryActionTypes => {
  return {
    type: DELETE_CATEGORY,
    payload: {
      id
    }
  }
}
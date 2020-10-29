import { Category } from "../db"

export const ADD_CATEGORY = 'ADD_CATEGORY'
export const BULK_ADD_CATEGORIES = 'BULK_ADD_CATEGORY'
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY'
export const DELETE_CATEGORY = 'DELETE_CATEGORY'

interface AddCategoryAction {
  type: typeof ADD_CATEGORY
  payload: {
    category: Category
  }
}

interface BulkAddCategories {
  type: typeof BULK_ADD_CATEGORIES
  payload: {
    categories: Category[]
  }
}

interface UpdateCategoryAction {
  type: typeof UPDATE_CATEGORY
  payload: {
    category: Category
  }
}

interface DeleteCategoryAction {
  type: typeof DELETE_CATEGORY
  payload: {
    id: string
  }
}

export type CategoryActionTypes = AddCategoryAction | UpdateCategoryAction | DeleteCategoryAction | BulkAddCategories
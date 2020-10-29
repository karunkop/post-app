import { combineReducers } from 'redux'
import categoryReducer, { CategoryState } from './categoryReducer'
import postReducer, { PostState } from './postReducer'

export interface State {
  category: CategoryState,
  post: PostState
}

export const rootReducer = combineReducers({
  category: categoryReducer,
  post: postReducer
})
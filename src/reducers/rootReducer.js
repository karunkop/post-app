import { combineReducers } from 'redux'
import categoryReducer from './categoryReducer'
import postReducer from './postReducer'

export const rootReducer = combineReducers({
  category: categoryReducer,
  post: postReducer
})
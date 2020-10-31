import {
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  BULK_ADD_CATEGORIES,
} from "../action-types/categoryActionTypes";

const initialState = {
  categories: [],
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.payload.category],
      };
    case BULK_ADD_CATEGORIES:
      return {
        ...state,
        categories: [...state.categories, ...action.payload.categories],
      };
    case UPDATE_CATEGORY:
      return {
        ...state,
        categories: state.categories.map((category) => {
          return action.payload.category.id === category.id
            ? action.payload.category
            : category;
        }),
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          (category) => action.payload.id !== category.id
        ),
      };
    default:
      return state;
  }
};

export default categoryReducer;

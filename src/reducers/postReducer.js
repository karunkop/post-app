import {
  ADD_POST,
  BULK_ADD_POSTS,
  UPDATE_POST,
  DELETE_POST,
} from "../action-types/postActionTypes";

const initialState = {
  posts: [],
};

const postReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload.post],
      };
    case BULK_ADD_POSTS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload.posts],
      };
    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map((post) => {
          return action.payload.post.id === post.id
            ? action.payload.post
            : post;
        }),
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => action.payload.id !== post.id),
      };
    default:
      return state;
  }
};

export default postReducer;

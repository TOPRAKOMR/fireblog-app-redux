import {
  CLEAR_NEW_BLOG,
  CLEAR_UPDATED_BLOG,
  CURRENT_BLOGS,
  SET_NEW_BLOG,
  SET_UPDATED_BLOG,
} from "../types/blogTypes";

const initialState = {
  currentBlogs: [],
  newBlog: {},
  updateBlog: {},
};

const blogReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CURRENT_BLOGS:
      return { ...state, currentBlogs: payload };
    case SET_NEW_BLOG:
      return { ...state, newBlog: payload };

    case CLEAR_NEW_BLOG:
      return initialState.newBlog;

    case SET_UPDATED_BLOG:
      return { ...state, updateBlog: payload };
    case CLEAR_UPDATED_BLOG:
      return initialState.updateBlog;

    default:
      return state;
  }
};

export default blogReducer;

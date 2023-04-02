import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload;
      return state.map((blog) =>
        blog.id !== updatedBlog.id ? blog : updatedBlog
      );
    },
    removeBlog(state, action) {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
  },
});

export const { setBlogs, appendBlog, updateBlog, removeBlog } =
  blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blogObject, user) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogObject);
    dispatch(appendBlog({ ...newBlog, user }));
  };
};

export default blogSlice.reducer;

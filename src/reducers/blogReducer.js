import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    initializeBlogs(state, action) {
      return action.payload;
    },
    createBlog(state, action) {
      state.push(action.payload);
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload;
      const index = state.findIndex((blog) => blog.id === updatedBlog.id);
      state[index] = updatedBlog;
    },
    removeBlog(state, action) {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
  },
});

export const { initializeBlogs, createBlog, updateBlog, removeBlog } =
  blogSlice.actions;

export default blogSlice.reducer;

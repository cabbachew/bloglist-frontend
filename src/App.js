import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setNotificationFor } from "./reducers/notificationReducer";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

import { initializeBlogs, appendBlog } from "./reducers/blogReducer";

const App = () => {
  const blogs = useSelector((state) => state.blogs);
  const [user, setUser] = useState(null);
  const message = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (loginObject, submitLoginSuccess) => {
    try {
      const user = await loginService.login(loginObject);

      window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);

      dispatch(setNotificationFor("logged in", "success", 5));

      submitLoginSuccess();
    } catch (exception) {
      const errorMessage = exception.response.data.error;

      dispatch(setNotificationFor(errorMessage, "error", 5));
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBloglistUser");
    setUser(null);

    dispatch(setNotificationFor("logged out", "success", 5));
  };

  const createBlog = async (blogObject, submitBlogSuccess) => {
    try {
      const returnedBlog = await blogService.create(blogObject);
      // setBlogs(blogs.concat({ ...returnedBlog, user: user }));
      dispatch(appendBlog({ ...returnedBlog, user: user }));

      dispatch(
        setNotificationFor(
          `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
          "success",
          5
        )
      );
      // Toggle visibility after post request is successful
      blogFormRef.current.toggleVisibility();
      submitBlogSuccess();
    } catch (exception) {
      const errorMessage = exception.response.data.error;

      dispatch(setNotificationFor(errorMessage, "error", 5));
    }
  };

  const updateBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.update(blogObject);
      // setBlogs(
      //   blogs.map((blog) =>
      //     blog.id !== returnedBlog.id ? blog : { ...returnedBlog, user: user }
      //   )
      // );

      dispatch(
        setNotificationFor(
          `blog ${returnedBlog.title} by ${returnedBlog.author} updated`,
          "success",
          5
        )
      );
    } catch (exception) {
      const errorMessage = exception.response.data.error;

      dispatch(setNotificationFor(errorMessage, "error", 5));
    }
  };

  const removeBlog = async (blogObject) => {
    if (
      window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}?`)
    ) {
      try {
        await blogService.remove(blogObject);
        // setBlogs(blogs.filter((blog) => blog.id !== blogObject.id));

        dispatch(
          setNotificationFor(
            `blog ${blogObject.title} by ${blogObject.author} removed`,
            "success",
            5
          )
        );
      } catch (exception) {
        const errorMessage = exception.response.data.error;
        dispatch(setNotificationFor(errorMessage, "error", 5));
      }
    }
  };

  const blogFormRef = useRef();

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={createBlog} />
    </Togglable>
  );

  // Sort blogs by likes in descending order
  // slice() is used to create a shallow copy because sort() mutates the original array
  const sortedBlogs = blogs.slice().sort((a, b) => b.likes - a.likes); // Must be >0 to swap

  return (
    <div>
      <Notification message={message} />
      {user === null ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
          {blogForm()}
          {sortedBlogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateBlog={updateBlog}
              removeBlog={removeBlog}
              currentUser={user}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;

import { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ handleCreate }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const submitBlog = (event) => {
    event.preventDefault();
    handleCreate(
      {
        title: newTitle,
        author: newAuthor,
        url: newUrl,
      },
      submitBlogSuccess
    );
  };

  const submitBlogSuccess = () => {
    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
  };

  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={submitBlog}>
        <div>
          title
          <input
            type="text"
            value={newTitle}
            id="title"
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={newAuthor}
            id="author"
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={newUrl}
            id="url"
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </div>
        <button id="create-button" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  handleCreate: PropTypes.func.isRequired,
};

export default BlogForm;

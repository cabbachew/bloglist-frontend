const Blog = ({blog}) => (

  <div className="blogStyle">
    <div>
      {blog.title} {blog.author}
    </div>
  </div>
)

export default Blog
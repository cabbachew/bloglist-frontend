import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const initialBlogs = await blogService.getAll()
      setBlogs(initialBlogs)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (loginObject, submitLoginSuccess) => {
    try {
      const user = await loginService.login(loginObject)

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setMessage({ body: 'logged in', type: 'success' })
      setTimeout(() => {
        setMessage(null)
      }, 5000)

      submitLoginSuccess()
    } catch (exception) {
        const errorMessage = exception.response.data.error
        setMessage({ body: errorMessage, type: 'error' })
        setTimeout(() => {
          setMessage(null)
        }, 5000)
    } 
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
    setMessage({ body: 'logged out', type: 'success' })
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const createBlog = async (blogObject, submitBlogSuccess) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setMessage({ body: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`, type: 'success' })
      setTimeout(() => {
        setMessage(null)
      }, 5000)

      submitBlogSuccess()
    } catch (exception) {
      const errorMessage = exception.response.data.error
      setMessage({ body: errorMessage, type: 'error' })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <Notification message={message} />
      {user === null ?
          <LoginForm
            handleLogin={handleLogin}
          /> :
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in
            <button onClick={handleLogout}>
              logout
            </button>
          </p>
          <Togglable buttonLabel="new blog">
            <BlogForm
              createBlog={createBlog}
            />
          </Togglable>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </div>
  )
}

export default App
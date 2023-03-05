import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  // const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('wrong credentials')
      // setErrorMessage('wrong credentials')
      // setTimeout(() => {
      //   setErrorMessage(null)
      // }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <div>blog form goes here</div>
    // <form onSubmit={addBlog}>
    //   <h2>create new</h2>
    //   <div>
    //     title
    //     <input
    //       type="text"
    //       value={newTitle}
    //       name="Title"
    //       onChange={({ target }) => setNewTitle(target.value)}
    //     />
    //   </div>
    //   <div>
    //     author
    //     <input
    //       type="text"
    //       value={newAuthor}
    //       name="Author"
    //       onChange={({ target }) => setNewAuthor(target.value)}
    //     />
    //   </div>
    //   <div>
    //     url
    //     <input
    //       type="text"
    //       value={newUrl}
    //       name="Url"
    //       onChange={({ target }) => setNewUrl(target.value)}
    //     />
    //   </div>
    //   <button type="submit">create</button>
    // </form>
  )

  return (
    <div>
      {/* <Notification message={errorMessage} */}
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in</p>
          {blogForm()}
        </div>
      }
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
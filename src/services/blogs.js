import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  // Capitalization is important here
  token = `Bearer ${newToken}`
}

// Add an interceptor to handle expired tokens
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.data.error === 'token expired') {
      // Token has expired, delete it from local storage and redirect to login page
      localStorage.removeItem('loggedBloglistUser')
      window.location = '/'
    }
    console.log('error', error)
    return Promise.reject(error)
  }
)

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async blogObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseUrl}/${blogObject.id}`, blogObject, config)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update, setToken }
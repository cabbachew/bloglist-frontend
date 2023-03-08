import React from "react"
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from "@testing-library/react"
import Blog from "./Blog"

test ("renders content", () => {
  const blog = {
    title: "Test title",
    author: "Test author",
    url: "Test url",
    likes: 0,
    user: {
      username: "Test username",
      name: "Test user"
    }
  }

  const currentUser = {
    username: "Test username",
    name: "Test user"
  }

  const removeBlog = () => {}
  const updatedBlog = () => {}

  render (
    <Blog
      blog={blog}
      removeBlog={removeBlog}
      updateBlog={updatedBlog}
      currentUser={currentUser}
    />
  )
  
  const element = screen.getByText("Test title Test author")
  // screen.debug(element)
  expect(element).toBeDefined()

  // Alternative: const { container } = render(<Blog ... />)
  // const element = container.querySelector(".blog")
  // expect(element).toHaveTextContent("Test title Test author")
})
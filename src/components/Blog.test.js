import React from "react"
import '@testing-library/jest-dom/extend-expect'
import { waitFor, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
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

  const removeBlog = jest.fn()
  const updatedBlog = jest.fn()

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

test ("clicking the button shows details", async () => {
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

  const removeBlog = jest.fn()
  const updatedBlog = jest.fn()

  render (
    <Blog
      blog={blog}
      removeBlog={removeBlog}
      updateBlog={updatedBlog}
      currentUser={currentUser}
    />
  )

  const user = userEvent.setup()
  const button = screen.getByText("view")
  await user.click(button)

  // findByX variants should be used when the element is not immediately available
  expect(await screen.findByText(/Test url/)).toBeDefined()
  expect(await screen.findByText(/likes 0/)).toBeDefined()
})
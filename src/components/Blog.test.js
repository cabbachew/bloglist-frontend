import React from "react"
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"

describe('<Blog />', () => {
  let container

  beforeEach(() => {
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

    container = render(
      <Blog
        blog={blog}
        removeBlog={removeBlog}
        updateBlog={updatedBlog}
        currentUser={currentUser}
      />
    ).container
  })

  test ("renders content", () => {
    const div = container.querySelector(".blog")
    expect(div).toBeDefined()
    expect(div).toHaveStyle("display: block")
    expect(div).toHaveTextContent("Test title Test author")

    // Check that the blog details are not visible
    const details = container.querySelector(".togglableContent")
    expect(details).toHaveStyle("display: none")
    expect(details).not.toBeVisible()
  })

  test ("clicking the button shows details", async () => {
    const user = userEvent.setup()
    const button = container.querySelector("button")
    await user.click(button)
  
    const div = container.querySelector(".togglableContent")
    expect(div).not.toHaveStyle("display: none")
    expect(div).toBeVisible()
  })
})
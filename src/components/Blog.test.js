import React from "react"
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"

describe('<Blog />', () => {
  let container
  let updateBlog

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
    updateBlog = jest.fn()

    container = render(
      <Blog
        blog={blog}
        removeBlog={removeBlog}
        updateBlog={updateBlog}
        currentUser={currentUser}
      />
    ).container
  })

  test ("renders content", () => {
    const blogDiv = container.querySelector(".blog")
    expect(blogDiv).toBeDefined()
    expect(blogDiv).toHaveStyle("display: block")
    expect(blogDiv).toHaveTextContent("Test title Test author")

    // Check that the blog details are not visible
    const detailsDiv = container.querySelector(".togglableContent")
    expect(detailsDiv).toHaveStyle("display: none")
    expect(detailsDiv).not.toBeVisible()
  })

  test ("clicking the button shows details", async () => {
    const user = userEvent.setup()
    const button = container.querySelector("button")
    await user.click(button)
  
    const div = container.querySelector(".togglableContent")
    expect(div).not.toHaveStyle("display: none")
    expect(div).toBeVisible()
  })

  test ("clicking the like button twice calls event handler twice", async () => {
    const user = userEvent.setup()
    const viewButton = container.querySelector("button")
    await user.click(viewButton)

    const likeButton = screen.getByText("like")
    await user.click(likeButton)
    await user.click(likeButton)

    expect(updateBlog.mock.calls).toHaveLength(2)
  })
})
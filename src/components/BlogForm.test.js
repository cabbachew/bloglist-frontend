import React from "react"
import { render, screen, within } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import userEvent from "@testing-library/user-event"
import BlogForm from "./BlogForm"

test("<BlogForm /> updates parent state and calls onSubmit", async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  // Alternatives: use getAllByRole or change component to use getByPlaceholderText / getByLabelText
  const titleInput = within(screen.getByText("title")).getByRole("textbox")
  const authorInput = within(screen.getByText("author")).getByRole("textbox")
  const urlInput = within(screen.getByText("url")).getByRole("textbox")
  const submitButton = screen.getByText("create")

  await user.type(titleInput, "Test title")
  await user.type(authorInput, "Test author")
  await user.type(urlInput, "Test url")
  await user.click(submitButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe("Test title")
  expect(createBlog.mock.calls[0][0].author).toBe("Test author")
  expect(createBlog.mock.calls[0][0].url).toBe("Test url")
})
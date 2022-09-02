import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render,screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Entryform from './Entryform'

test('form called event handler with right props', async () => {
  const handleCreateBlog = jest.fn()
  const user = userEvent.setup()

  const { container } = render(<Entryform handleCreateBlog={handleCreateBlog} />)
  const txtTitle =  container.querySelector('.title')
  const txtAuthor = container.querySelector('.author')
  const txtUrl = container.querySelector('.url')
  const button = screen.getByText('Submit')

  await user.type(txtTitle,'abc')
  await user.type(txtAuthor,'qwe')
  await user.type(txtUrl,'http://aaa.com')
  await user.click(button)

  expect(handleCreateBlog.mock.calls).toHaveLength(1)
  expect(handleCreateBlog.mock.calls[0][0].title).toBe('abc')
})

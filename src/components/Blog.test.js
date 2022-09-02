import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render,screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('render title and author only', () => {
  const blog = {
    title:'try and error',
    author:'malina salim',
    url:'http://goto.com',
    likes:5,
    user:{ name:'sulaiman' }
  }

  const { container } = render(<Blog blog={blog} />)
  const title = screen.getByText('try and error malina salim')
  expect(title).toBeDefined()
  const div = container.querySelector('.toggleablecontent')
  expect(div).toHaveStyle('display:none')
  expect(div).toHaveTextContent('http://goto.comlikes 5')
})

test('render url and likes when button click', async() => {
  const blog = {
    title:'try and error',
    author:'malina salim',
    url:'http://goto.com',
    likes:5,
    user:{ name:'sulaiman' }
  }

  const { container } =render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const div = container.querySelector('.toggleablecontent')
  expect(div).not.toHaveStyle('display: none')
  expect(div).toHaveTextContent('http://goto.comlikes 5')
})

test('likes button clicked twice',async () => {

  const mockHandler = jest.fn()

  render(<button onClick={mockHandler}>like</button>)
  const user =userEvent.setup()
  const button = screen.getByText('like')
  await user.click(button)
  await user.click(button)
  expect(mockHandler.mock.calls).toHaveLength(2)
})
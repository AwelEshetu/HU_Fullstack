import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'
//import { prettyDOM } from '@testing-library/dom'


test('renders content', () => {
  const blog={
                 _id: "5a422a851b54a676234d17f7",
                  title: "React patterns",
                  author: "Michael Chan",
                  url: "https://reactpatterns.com/",
                  likes:26     
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )
  
 // component.debug() 
    
  const div = component.container.querySelector('.tileAuthor')
  expect(div).toHaveTextContent(
    'React patterns Michael Chan'
  )
    
const likes = component.container.querySelector('.likes')
  expect(likes).toHaveTextContent(
    'blog has 26 likes'
  )
})

test('clicking the button calls event handler', () => {
  const blog={
                 _id: "5a422a851b54a676234d17f7",
                  title: "React patterns",
                  author: "Michael Chan",
                  url: "https://reactpatterns.com/",
                  likes:26     
  }
  
 const mockHandler = jest.fn()
  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )
  
  
    
  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'



test('at start the children are not displayed', () => {
  const blog={
            likes: 26,
            title: "React patterns Rocks",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            user: "5de274f0add9cf3b5cec6251",
            id: "5de386de4769be7ba4ee01d6"
            }
   const user={
            username: "root",
            name: "Superuser",
            id: "5de274f0add9cf3b5cec6251"
            }

  const component = render(
    <Blog blog={blog} user={user} />
  )
  
    //component.debug()  
    const div = component.container.querySelector('.showDetail')
    expect(div).toHaveStyle('display: none')


})

test('after clicking the button, children are displayed', () => {
  const blog={
            likes: 26,
            title: "React patterns Rocks",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            user: "5de274f0add9cf3b5cec6251",
            id: "5de386de4769be7ba4ee01d6"
            }
   const user={
            username: "root",
            name: "Superuser",
            id: "5de274f0add9cf3b5cec6251"
            }
   const component = render(
    <Blog blog={blog} user={user}/>
  )
   //component.debug()  
    const div = component.container.querySelector('.makeVisible')
    const div2 = component.container.querySelector('.showDetail')
    fireEvent.click(div)

    expect(div2).not.toHaveStyle('display: none')
})
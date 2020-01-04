import React from 'react'
import { render, waitForElement,fireEvent} from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'
/*import LoginForm from './LoginForm'

const Wrapper = (props) => {

  const onChange = (event) => {
    props.state.value = event.target.value
  }

  return (
    <LoginForm
      value={props.state.value}
      onSubmit={props.onSubmit}
      handleChange={onChange}
    />
  )
} */

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    ) 
   
    const login = component.getByText('login')
    expect(login).toBeDefined()
      
    const logged = component.getByText('Login')
    
    expect(logged).toBeDefined()
    
    const username=component.getByText('username')
    expect(username).toBeDefined()
   
    const password=component.getByText('password')
    expect(password).toBeDefined()
   
  })
})

/*describe('<App />', () => {
  test('if user logged, blogs are rendered', async () => {
    const user = {
          username: 'aweleshetu',
          token: '1231231214',
          name: 'Awel Eshetu'
        }

    localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
                
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.container.querySelector('.blogs')
    ) 
   
   const blogs = component.container.querySelectorAll('.blogs')
    expect(blogs.length).toBe(13)
   
  })
})*/
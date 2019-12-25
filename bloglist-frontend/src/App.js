import React ,{ useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

const App =() => {

  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [isError,setIsError]=useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)

  //get all the blogs
  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => setBlogs(initialBlogs))
  }, [])


  //save token to local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  //handle login
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setIsError(true)
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  //handle logout and clear session
  const handleLogout=async (event) => {
    event.preventDefault()
    try {

      window.localStorage.removeItem('loggedBlogappUser')

      blogService.setToken(null)
      setUser(null)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setIsError(true)
      setErrorMessage('Please login')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const blogFormRef = React.createRef()
  //add new blog
  const addBlog = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    try{
      const blog= await blogService.create(blogObject)
      setBlogs(blogs.concat(blog))

      setTitle('')
      setAuthor('')
      setUrl('')
      setIsError(false)
      setErrorMessage(`a new Blog ${blogObject.title} by ${blogObject.author} added`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }catch(expection){
      setIsError(true)
      setErrorMessage('Invalid data')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

  //generate blogs
  //handle likes
  const handleLike= async (id) => {
    const blog = blogs.find(n => n.id === id)
    const like=blog.likes+1
    const newBlog={ ...blog,likes:like }

    try{

      await blogService.update(id, newBlog)
      setBlogs(blogs.map(blog => blog.id!==id ? blog : { ...blog, likes: like } ))

    }catch(exception){
      // console.log('there is some exception'+JSON.stringify(exception))
      setIsError(true)
      setErrorMessage(`Blog '${blog.title}' was already removed from server`)
      setTimeout(() => {setErrorMessage(null)}, 5000)
      setBlogs(blogs.filter(n => n.id !== id))
    }
  }

  const handleRemove= async (id) => {
    const blog = blogs.find(n => n.id === id)
    //console.log('blog contains '+JSON.stringify(blog));
    //console.log('user '+JSON.stringify(user));

    try{
      let confirmToDelete=window.confirm(`remove blog ${blog.title} by ${blog.author}`)
      //alert(`your response is ${confirmToDelete}`);
      if(confirmToDelete && blog.user.username===user.username){
        await blogService.remove(id)
        setBlogs(blogs.filter(n => n.id !== id))
      }

    }catch(exception){
      setIsError(true)
      setErrorMessage(`Blog '${blog.title}' was already removed from server`)
      setTimeout(() => {setErrorMessage(null)}, 5000)
      setBlogs(blogs.filter(n => n.id !== id))
    }
  }
  const blogForm = () => (
    <>
     {
       blogs.sort((prev,current) => current.likes - prev.likes).map(blog =>
         <Blog key={blog.id} user={user} blog={blog} handleLike={() => handleLike(blog.id)} handleRemove={() => handleRemove(blog.id)}/>
       )}
    </>
  )

  //login form
  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  //logout buttton
  const logOut= () => (
      <>
        <button onClick={handleLogout}>Logout</button>
      </>
  )

  //render dev
  return (
    <div className="App">
      <Notification message={errorMessage} error={isError}/>

      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in {logOut()}</p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm
              onSubmit={addBlog}
              title={title}
              author={author}
              url={url}
              handleTitle={({ target }) => setTitle(target.value)}
              handleAuthor={({ target }) => setAuthor(target.value)}
              handleUrl={({ target }) => setUrl(target.value)}
            />
          </Togglable>
          {blogForm()}
        </div>
      }

    </div>
  )
}

export default App

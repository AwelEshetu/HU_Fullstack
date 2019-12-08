import React ,{ useState, useEffect } from 'react';
import Blog from './components/Blog' ;
import Notification from './components/Notification'

import blogService from './services/blogs' ;
import loginService from './services/login' ;

const App =()=>{
    
      const [blogs, setBlogs] = useState([]) 
      const [errorMessage, setErrorMessage] = useState(null)
      const [isError,setIsError]=useState(true)
      const [username, setUsername] = useState('')
      const [password, setPassword] = useState('') 
      const [user, setUser] = useState(null) 
      const [title, setTitle] = useState('')
      const [author, setAuthor] = useState('') 
      const [url, setUrl] = useState('') 
  
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
 const handleLogout=async (event)=>{
     event.preventDefault()
    try {
      
       window.localStorage.removeItem('loggedBlogappUser');
        
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
 
 //add new blog 
  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
   try{
       const blog= await blogService.create(blogObject);
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
 const blogForm = () => ( 
    <>
     {
     blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )  
 //login form 
 const loginForm = () => (
     <>
     <h2>Login got application </h2>
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
    </>
  )
  //logout buttton 
  const logOut= ()=>(
      <>
        <button onClick={handleLogout}>Logout</button>
      </>
  )
  
  const createBlogForm=()=>(
  <form onSubmit={addBlog}>
      <div>
        title :
          <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author :
          <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url :
          <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  
  )
  
  //render dev 
  return (
    <div className="App">
      <Notification message={errorMessage} error={isError}/>
       {user === null ?
        loginForm() :
        <div>
          <h2>Blogs</h2>
          <p>{user.name} logged in {logOut()}</p>
          {createBlogForm()}
          {blogForm()}
        </div>
      }
      
    </div>
  );
}

export default App;

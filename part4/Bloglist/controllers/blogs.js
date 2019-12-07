const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')



blogsRouter.get('/', async (request, response,next) => {
    
  try{
      const blogs = await Blog
       .find({}).populate('user', { username: 1, name: 1 })
      
      response.json(blogs.map(blog => blog.toJSON()))     
  }catch(exception){
      next(exception)
  }
})

//get token related to user
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

//post new blog
blogsRouter.post('/', async(request, response,next) => {
    try{
        
        const token = getTokenFrom(request)
        const decodedToken = jwt.verify(token, process.env.SECRET)
       // const decodedToken = jwt.verify(request.token, process.env.SECRET)
        
        if (!token || !decodedToken.id) {
          return response.status(401).json({ error: 'token missing or invalid' })
        }
        
        const user = await User.findById(decodedToken.id)
        const blogPost={...request.body,user: user._id}
        const blog = new Blog(blogPost)
        const saveBlog=await blog.save();
        user.blogs = user.blogs.concat(saveBlog._id)
        await user.save()
        response.status(201).json(saveBlog.toJSON())
        
    }catch(exception){
       next(exception) 
    } 
})

// find single post
blogsRouter.get('/:id',async (request, response, next) => {
  
    try{
      const blog= await Blog.findById(request.params.id);
      if (blog) {
       response.json(blog.toJSON())
      } else {
        response.status(404).end()
      }
    }
    catch(error){
     next(error)
   }
})

// delete a blog post
blogsRouter.delete('/:id', async (request, response, next) => {
      //const blogPost= await Blog.findById(request.params.id);  
    
    try{
          
         /*  const token = getTokenFrom(request)
           const decodedToken = jwt.verify(token, process.env.SECRET)
        
            if (!token || !decodedToken.id) {
              return response.status(401).json({ error: 'token missing or invalid' })
            }
        
        const user = await User.findById(decodedToken.id)
        
        console.log(`to be deleted ${JSON.stringify(blogPost.user.id)}`);
        console.log(`user from token ${user._id}`);
        console.log(`request object from delete ${JSON.stringify(request.params)}`);
    if(user._id.toString()===blogPost.user.id.toString()){
    */
        await Blog.findByIdAndRemove(request.params.id);
       response.status(204).end() 
     //}
        
    }catch(error){
        next(error)
    }
})

//update a blog post
blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    likes: body.likes,
  }

  
    try{
       const updatedBlog= await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
       response.json(updatedBlog.toJSON()) 
    }catch(error){
        next(error)
    }
})

module.exports = blogsRouter
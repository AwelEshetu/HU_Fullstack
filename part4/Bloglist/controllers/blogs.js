const blogsRouter = require('express').Router()
const Blog = require('../models/blog')




blogsRouter.get('/', async (request, response,next) => {
    
  try{
      const blogs=await Blog.find({});
      response.json(blogs.map(blog => blog.toJSON()))
      
  }catch(exception){
      next(exception)
  }
})

//post new blog
blogsRouter.post('/', async(request, response,next) => {
    try{
        const blog = new Blog(request.body)
        const saveBlog=await blog.save();
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

module.exports = blogsRouter
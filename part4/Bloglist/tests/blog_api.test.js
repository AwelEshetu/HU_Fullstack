const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')


beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(helper.initialBlogs.length)
})

// check for unique identifier being id

test('check for unique identifier id ', async () => {
    const blogs= await api.get('/api/blogs');
    
    for( let blog of blogs.body){
        expect(blog.id).toBeDefined();
    }
  
});

//testing post 

test('a valid post can be added ', async () => {
  const newBlog = 
    {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 15
  }
  

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)


  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

  const title = blogsAtEnd.map(blog => blog.title)
 
  expect(title).toContainEqual (
    'TDD harms architecture'
  )
})

// test for default like to be zero
test("if likes is missing, it's defaulted to zero" , async () => {
  const newBlog = 
    {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/"
   }
  
// add new blog without likes 
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

 const newPost= await api.get(`/api/blogs/${newBlog._id}`)
  expect(newPost.body.likes).toBe(0)
})

// testing for required fields /bad request

test('adding without required fields should fail ', async () => {
    
    
  const newBlog = 
    {
    author: "Robert C. Martin",
    likes: 115
  }
  
  //add new blog without url and title and should fail
  
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);
        
})

afterAll(() => {
  mongoose.connection.close()
}) 
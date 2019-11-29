/*const listHelper = require('../utils/list_helper')


test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

//total likes

describe('total likes', () => {
   
    test('with empty list should equal to zero', () => {
    const result = listHelper.totalLikes(emptyList)
    expect(result).toBe(0)
    })
    

   test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
     
});

//favorite Blog

describe('favorite Blog ', () => {
   
test('blog post with most likes with empty list',()=>{
    const result=listHelper.favoriteBlog(emptyList);
    expect(result).toMatch('no blog posts available');
    
});
    
test('blog post with most likes with two or more equally favorite posts',()=>{
    const result=listHelper.favoriteBlog(listWithEqualLikes);
       
   let blogLists=[];
    for(let obj of listWithEqualLikes){
        blogLists.push({
              title: obj.title,
              author: obj.author,
              likes:obj.likes
        })
    }

    let maxLikes=Math.max(...listWithEqualLikes.map(blog=>blog.likes)),
        favPost=blogLists.filter(blog=>blog.likes===maxLikes)[0];  
    expect(result).toEqual(favPost);
    
   
   
    
});
    
test('blog post with most likes with non equal likes',()=>{
    const result=listHelper.favoriteBlog(blogs);
    
    let blogLists=[];
    for(let obj of blogs){
        blogLists.push({
              title: obj.title,
              author: obj.author,
              likes:obj.likes
        })
    }
    let maxLikes=Math.max(...blogs.map(blog=>blog.likes)),
        favPost=blogLists.filter(blog=>blog.likes===maxLikes)[0];
   
    expect(result).toEqual(favPost);
    
});
 
})

//mostBlogs 
describe('most Blogs  ', () => {
    
test('author with most blogs with empty list',()=>{
    const result=listHelper.mostBlogs(emptyList);  
    expect(result).toMatch('no blog posts available');   
    
});
     
test('author with most blogs with non empty list ',()=>{
    const result=listHelper.mostBlogs(blogs);
     let blogLists=[],
        authors=[...new Set(blogs.map(blog=>blog.author))];
    for(let name of authors){
        let totalBlogs=blogs.map(blog=>blog.author===name).length;
        blogLists.push({author:name,blogs:totalBlogs})
    }
 let maxBlog=Math.max(...blogLists.map(item=>item.blogs)),
     mostBlogs=blogLists.filter(item=> item.blogs===maxBlog)[0];
    
    expect(result).toEqual(mostBlogs);
     
    
});
 
test('author with most blogs with two lists of different authors ',()=>{
    const result=listHelper.mostBlogs(blogs);
     let blogLists=[],
        authors=[...new Set(blogs.map(blog=>blog.author))];
    for(let name of authors){
        let totalBlogs=blogs.map(blog=>blog.author===name).length;
        blogLists.push({author:name,blogs:totalBlogs})
    }
 let maxBlog=Math.max(...blogLists.map(item=>item.blogs)),
     mostBlogs=blogLists.filter(item=> item.blogs===maxBlog)[0];
    
    expect(result).toEqual(mostBlogs);
    
});
})

//most Likes  
describe('most Likes   ', () => {
    
test('author who has most liked blog posts with empty list',()=>{
    const result=listHelper.mostLikes(emptyList);   
    expect(result).toMatch('no blog posts available');
       
});
     
test('author who has most liked blog posts with non empty list ',()=>{
    const result=listHelper.mostLikes(blogs);
     let blogLists=[],
        authors=[...new Set(blogs.map(blog=>blog.author))];
       
    for(let name of authors){
        let totalLikes=blogs.map(blog=>blog.author===name ? blog.likes : 0 ).reduce((prev,next)=>prev+next, 0);
        blogLists.push({author:name,likes:totalLikes})
    }
    let maxLikes=Math.max(...blogLists.map(item=>item.likes)),
      mostLikedAuthor=blogLists.filter(item=> item.likes===maxLikes)[0];
    
    expect(result).toEqual(mostLikedAuthor);
   
   
    
});
    
test('author who has most liked blog posts with two equally liked blogposts ',()=>{
    const result=listHelper.mostLikes(blogs);
     let blogLists=[],
        authors=[...new Set(blogs.map(blog=>blog.author))];
       
    for(let name of authors){
        let totalLikes=blogs.map(blog=>blog.author===name ? blog.likes : 0 ).reduce((prev,next)=>prev+next, 0);
        blogLists.push({author:name,likes:totalLikes})
    }
    let maxLikes=Math.max(...blogLists.map(item=>item.likes)),
      mostLikedAuthor=blogLists.filter(item=> item.likes===maxLikes)[0];
    
    expect(result).toEqual(mostLikedAuthor);
    
}); 

})*/

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

//testing post 

test('a valid post can be added ', async () => {
  const newBlog = 
    {
    _id: "5a422ba71b54a676234d17f6",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 15,
    __v: 0
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

afterAll(() => {
  mongoose.connection.close()
}) 
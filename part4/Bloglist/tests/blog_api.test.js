const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

// login and get token before every post request
let token=null;
beforeAll(  async () => {
          const newUser = {
                          username: 'pasta',
                          name: 'Holly Cows',
                          password: 'salainen',
                        }

                await api
                  .post('/api/users')
                  .send(newUser);
          
       const res= await api
          .post('/api/login')
          .send({
             "username": "pasta",
              "password": "salainen"
          });
         // console.log('response body '+ JSON.stringify(res));
          token = res.body.token; 
          console.log(`token from response ${token}`)
            
      },30000); 

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('when there is initially some Blogs saved', () => {
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
       console.log(`blogs to be mentioned ${JSON.stringify(blogs)}`)
      for( let blog of blogs.body){
            expect(blog.id).toBeDefined();
        }
    });
    
});
         
describe('viewing a specific blog', () => {
    test('succeeds with a valid id', async () => {
      const blogsAtStart = await helper.blogsInDb()

      const blogToView = blogsAtStart[0]

      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(resultBlog.body).toEqual(blogToView)
    })

    test('fails with statuscode 404 if blog does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()

      console.log(validNonexistingId)

      await api
        .get(`/api/blogs/${validNonexistingId}`)
        .expect(404)
    })

    test('fails with statuscode 400 id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api
        .get(`/api/blogs/${invalidId}`)
        .expect(400)
    })
});

//testing post 
describe('addition of a new blog', () => {
    test('succeeds with valid data', async () => {
      const newBlog = 
        {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 15
      }


      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
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
    test("succeeds to add default likes to be zero when likes is not provided" , async () => {
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
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

     const newPost= await api.get(`/api/blogs/${newBlog._id}`)
      expect(newPost.body.likes).toBe(0)
    })

    // testing for required fields /bad request

    test('fails with status code 400 if data invaild', async () => {


      const newBlog = 
        {
        author: "Robert C. Martin",
        likes: 115
      }

      //add new blog without url and title and should fail

        await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)
        .expect(400);

    })
});

describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)     
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd.length).toBe(
        helper.initialBlogs.length - 1
      )

      const titles = blogsAtEnd.map(r => r.title)

      expect(titles).not.toContain(blogToDelete.title)
    })
  })

describe('updating likes of a blog', () => {
    test('succeeds with status code 200 if data is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]
      const newLikes={
          likes:65
       }

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(newLikes)
        .expect(200)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd[0].likes).toBe(newLikes.likes)
        
    })
  })

//testing users 

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({ username: 'root', password: 'sekret' })
    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'aweleshetu',
      name: 'Awel Eshetu',
      password: 'fentaw',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
    
 test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'superuser',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })
    
 
})

afterAll(() => {
  mongoose.connection.close()
}) 
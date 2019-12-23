const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', {url:1 , title: 1, author: 1 })
    
  response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body

 
    
     if (body.password === undefined ) {
        return response.status(400).json({ error: 'password missing' })
      } 
      
      if(body.password.length < 3 ){
          return response.status(400).json({ error: 'password must be 3 or more chars' })
      }
      
      if (body.username === undefined ) {
        return response.status(400).json({ error: 'username missing' })
      }
      
      if(body.username.length < 3 ){
          return response.status(400).json({ error: 'username must be 3 or more chars' })
      }
      
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })
    
    const savedUser = await user.save()

    response.json(savedUser)
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter
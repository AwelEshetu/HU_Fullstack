require('dotenv').config()
const express = require('express'),
      bodyParser = require('body-parser'),
      morgan=require('morgan'),
      cors = require('cors'),
      Person = require('./models/person')
      app = express(),
      PORT = process.env.PORT;
app.use(express.static('build'))
app.use(bodyParser.json());

app.use(cors());

morgan.token('body', function (req, res) { return JSON.stringify(req.body) });

app.use(morgan(':method :url :status :response-time ms :body '));


// handler of requests with unknown endpoint
/*const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)*/

//error handler middleware
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler)

//send index page
  app.get("/", (req, res) => {
    res.sendFile(path.join((__dirname,"build/index.html")));
  });

//provide some info
app.get('/info',(req,res)=>{
    let d=new Date();
    Person.find({}).then(persons => {
    res.send(`
     <p>Phonebook has info for ${persons.length}</p>
     <p>${d.toString()}</p>
    `)
  }).catch(error => next(error))
     
});
//get all phonebook persons
app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons.map(person => person.toJSON()))
  }).catch(error => next(error))
})
//get specific person
app.get('/api/persons/:id', (request, response) => {
 Person.findById(request.params.id).then(person => {
    if (person) {
        response.json(person.toJSON())
      } else {
        response.status(404).end() 
      }
    })
    .catch(error => next(error))
  })


//save person to phonebook
app.post('/api/persons', (request, response) => {
 /* const body = request.body;
  console.log(JSON.stringify(body))
  if (body.name===undefined || body.number) {
    return response.status(400).json({ 
      error: 'The name or number is missing' 
    })
  }
  
  const person =new Person({
    name: body.name,
    number: body.number,
    date: new Date()
  });*/
const person=new Person({...request.body,date:new Date()})
  person.save().then(savedPerson => {
    response.json(savedPerson.toJSON())
  }).catch(error=>next(error))
})
//update specific person 
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})
//delete specific person
app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
const personsRouter = require('express').Router()
const Person = require('../models/person')

personsRouter.get('/', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons.map(person => person.toJSON()))
  })
})

personsRouter.get('/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

personsRouter.post('/', (request, response, next) => {
  const body = request.body
  
 const person =new Person({
    name: body.name,
    number: body.number,
    date: new Date()
  });

  person.save()
    .then(savedPerson => {
      response.json(savedPerson.toJSON())
    })
    .catch(error => next(error))
})

personsRouter.delete('/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

personsRouter.put('/:id', (request, response, next) => {
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

module.exports = personsRouter
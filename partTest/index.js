
const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors');
const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true
  }
]

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/notes', (req, res) => {
  res.json(notes)
})
app.get('/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note =>  note.id === id)
  
 if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})


app.post('/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId(),
  }

  notes = notes.concat(note)

  response.json(note)
})

app.delete('/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
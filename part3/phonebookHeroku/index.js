require('dotenv').config()
const express = require('express'),
      bodyParser = require('body-parser'),
      morgan=require('morgan'),
      cors = require('cors'),
      Person = require('./models/person')
      app = express(),
      PORT = process.env.PORT;
app.use(bodyParser.json());
app.use(cors());

morgan.token('body', function (req, res) { return JSON.stringify(req.body) });

app.use(morgan(':method :url :status :response-time ms :body '));



const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}


 app.use(express.static("build"));
  app.get("/", (req, res) => {
    res.sendFile(path.join((__dirname,"build/index.html")));
  });


app.get('/info',(req,res)=>{
    let d=new Date();
     res.send(`
     <p>Phonebook has info for ${persons.length}</p>
     <p>${d.toString()}</p>
`)
});
app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons.map(person => person.toJSON()))
  })
})

app.get('/api/persons/:id', (request, response) => {
 Person.findById(request.params.id).then(person => {
    response.json(person.toJSON())
  })
})


app.post('/api/persons', (request, response) => {
  const body = request.body;
  console.log(JSON.stringify(body))
  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'The name or number is missing' 
    })
  }
  
  const person =new Person({
    name: body.name,
    number: body.number,
    date: new Date()
  });

  person.save().then(savedPerson => {
    response.json(savedPerson.toJSON())
  })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
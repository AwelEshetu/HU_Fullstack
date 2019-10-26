const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2],
      name=process.argv[3],
      number=process.argv[4];

const url =`mongodb+srv://fullstack:${password}@cluster0-clay1.mongodb.net/phonebook-app?retryWrites=true&w=majority`
  

mongoose.connect(url, { useNewUrlParser: true })

const phoneBookSchema = new mongoose.Schema({
  name: String,
  number:String,
  date: Date,
})

const Person = mongoose.model('Person', phoneBookSchema)

const person = new Person({
  name: name,
  number:number,
  date: new Date(),
})

if(name===undefined&&number===undefined){
  Person.find({}).then(result => {
  console.log('Phonebook : ')
  result.forEach(person => {
    console.log(`${person.name} ${person.number}`)
  })
  mongoose.connection.close()
}) 
}else{
 person.save().then(response => {
  console.log(`added ${name} number ${number} to phonebook`)
  mongoose.connection.close()
})
}

const mongoose = require('mongoose'),
      uniqueValidator = require('mongoose-unique-validator');
mongoose.set('useFindAndModify', false)
const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const phoneBookSchema = new mongoose.Schema({
  name: { type: String, minlength: [3, 'Too few characters for a name'],required: true, unique: true },
  number:{ type: String, minlength: [8, 'Too few digits for a phone number'],required: true, unique: true },
  date: Date,
})
phoneBookSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });

phoneBookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', phoneBookSchema)
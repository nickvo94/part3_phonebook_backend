const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
//const mongoose = require('mongoose')
const Person = require('./models/person')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api', (req, res) => {
  res.send('<h1>Api page!</h1>')
})

app.get('/info', (req, res) => {
  Person.estimatedDocumentCount().then(count => {
    //console.log('entries ', count)
    const date = Date()
    res.send(`<div> <div>Phonebook has info of ${count} people</div> <div>${date}</div> </div>`)
  })
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => res.json(persons))
})

app.get('/api/persons/:id', (req, res, next) => {
  /* const id = Number(req.params.id)
    const person = persons.find(p => p.id === id) */

  Person.findById(req.params.id)
    .then(person => {
      //console.log('find by id', person)
      person ? res.json(person) : res.status(404).end()
    })
    .catch(error => {
      /* console.log(error)
            res.status(400).send({ error: 'malformatted id' }) */
      next(error)
    })
})

/* const generateId = () => {
  let ids = persons.map(p => p.id)
  let newId = parseInt(Math.random()*(Math.pow(2, 64)))
  return ids.includes(newId) ? generateId() : newId
} */

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  /* const names = persons.map(p => p.name)
    console.log(persons)*/
  if (!body.name) {
    return res.status(400).json({ error: 'name missing' })
  }
  else if (!body.number) {
    return res.status(400).json({ error: 'number missing' })
  }

  const person = new Person ({
    name: body.name,
    number: body.number,
  })

  /* persons = persons.concat(person)
    res.json(person) */

  person
    .save()
    .then(savedPerson => {
      res.json(savedPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  Person.findByIdAndUpdate(req.params.id, { number: body.number }, { new: true, runValidators: true })
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  /* const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)
    console.log(persons)

    res.status(204).end() */

  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      console.log('deleted result ', result)
      if (!result) {
        let error = {}
        error.name = 'NullError'
        next(error)
      }
      res.status(204).end()
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  else if (error.name === 'NullError') {
    return response.status(404).json({ error: 'Id has been removed' })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT //|| 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
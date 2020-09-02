const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    },
    {
        "name": "Danniel",
        "number": "12-43-234345",
        "id": 5
    },
    {
        "name": "Marria",
        "number": "39-23-6423122",
        "id": 6
    },
]

app.get('/api', (req, res) => {
    res.send('<h1>Api page!</h1>')
})

app.get('/info', (req, res) => {
    const entries = persons.length
    const date = Date()
    res.send(`<div> <div>Phonebook has info of ${entries} people</div> <div>${date}</div> </div>`)
})

app.get('/api/persons', (req, res) => {
    return res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id) 
    const person = persons.find(p => p.id === id)
    person ? res.json(person) : res.status(404).end()
})

const generateId = () => {
    let ids = persons.map(p => p.id)
    let newId = parseInt(Math.random()*(Math.pow(2, 64)))
    return ids.includes(newId) ? generateId() : newId
}

app.post('/api/persons', (req, res) => {
    const body = req.body
    const names = persons.map(p => p.name)
    console.log(persons)
    if (!body.name) {
        return res.status(400).json({error: 'name missing'})
    }
    else if (names.includes(body.name)) {
        return res.status(400).json({error: 'name must be unique'})
    }
    else if (!body.number) {
        return res.status(400).json({error: 'number missing'})
    }

    const person = {
        name: body.name,
        number: body.number, 
        id: generateId()
    }

    persons = persons.concat(person)

    res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id) 
    persons = persons.filter(p => p.id !== id)
    console.log(persons)

    res.status(204).end()    
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
import express from 'express'
import fs from 'fs'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

// Load DB
const dbFile = './cats.json'

// Get all
app.get('/cats', (req, res) => {
  const cats = JSON.parse(fs.readFileSync(dbFile))
  res.json(cats)
})

// Add
app.post('/cats', (req, res) => {
  const cats = JSON.parse(fs.readFileSync(dbFile))
  const newCat = { id: pets.length + 1, ...req.body }
  pets.push(newCat)
  fs.writeFileSync(catsFile, JSON.stringify(cats, null, 2))
  res.json(newCat)
})

// Update
app.put('/cats/:id', (req, res) => {
  const cats = JSON.parse(fs.readFileSync(dbFile))
  const id = parseInt(req.params.id)
  const index = cats.findIndex(p => p.id === id)
  if (index !== -1) {
    cats[index] = { ...cats[index], ...req.body }
    fs.writeFileSync(catsFile, JSON.stringify(cats, null, 2))
    res.json(cats[index])
  } else {
    res.status(404).send('Cat not found')
  }
})

app.listen(3000, () => console.log('Server running on http://localhost:3000'))

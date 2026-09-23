import express from 'express'
import fs from 'fs'
import path from 'path'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

const DATA = path.resolve('./data/registrations.json')

app.post('/api/register', (req, res) => {
  try {
    const body = req.body || {}
    let arr = []
    try { arr = JSON.parse(fs.readFileSync(DATA, 'utf-8')) } catch { arr = [] }
    arr.push({
      ts: new Date().toISOString(),
      name: body.name || '',
      email: body.email || '',
      student: body.student || ''
    })
    fs.mkdirSync(path.dirname(DATA), { recursive: true })
    fs.writeFileSync(DATA, JSON.stringify(arr, null, 2))
    res.json({ message: 'Registration saved (local)', count: arr.length })
  } catch (e) {
    res.status(500).json({ message: 'Error saving registration', error: String(e) })
  }
})

app.get('/api/registrations', (req, res) => {
  try {
    let arr = []
    try { arr = JSON.parse(fs.readFileSync(DATA, 'utf-8')) } catch { arr = [] }
    res.json(arr)
  } catch (e) {
    res.status(500).json({ message: 'Error reading registrations', error: String(e) })
  }
})

const PORT = process.env.PORT || 8787
app.listen(PORT, () => console.log('Server listening on ' + PORT))

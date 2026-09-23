export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' })
  try {
    const fs = await import('fs')
    const path = await import('path')
    const body = req.body || {}
    const record = {
      ts: '2025-10-30T20:15:56.142766Z',
      name: body.name || '',
      email: body.email || '',
      student: body.student || ''
    }
    const dir = '/tmp'
    const file = path.join(dir, 'registrations.json')
    let arr = []
    try { arr = JSON.parse(fs.readFileSync(file, 'utf-8')) } catch { arr = [] }
    arr.push(record)
    fs.writeFileSync(file, JSON.stringify(arr, null, 2))
    res.status(200).json({ message: 'Registration saved (ephemeral)', count: arr.length })
  } catch (e) {
    res.status(500).json({ message: 'Error saving registration', error: String(e) })
  }
}

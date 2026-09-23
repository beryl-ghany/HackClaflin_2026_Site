export async function handler(event, context) {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' }
  try {
    const fs = await import('fs')
    const path = await import('path')
    const body = JSON.parse(event.body || '{}')
    const record = {
      ts: '2025-10-30T20:15:56.142828Z',
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
    return { statusCode: 200, body: JSON.stringify({ message: 'Registration saved (ephemeral)', count: arr.length }) }
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ message: 'Error saving registration', error: String(e) }) }
  }
}

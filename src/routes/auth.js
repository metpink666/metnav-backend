import { Hono } from 'hono'
import { login, changePassword } from '../controllers/auth.js'

const app = new Hono()

app.post('/login', login)
app.put('/password', changePassword)

export default app
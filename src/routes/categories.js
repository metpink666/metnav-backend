import { Hono } from 'hono'
import { list, getOne, create, update, remove } from '../controllers/categories.js'

const app = new Hono()

app.get('/', list)
app.get('/:id', getOne)
app.post('/', create)
app.put('/:id', update)
app.delete('/:id', remove)

export default app
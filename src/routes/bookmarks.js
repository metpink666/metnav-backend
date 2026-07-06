import { Hono } from 'hono'
import { list, listByCategory, getOne, create, update, remove, fetchIcon } from '../controllers/bookmarks.js'

const app = new Hono()

app.get('/', list)
app.get('/category/:categoryId', listByCategory)
app.get('/:id', getOne)
app.post('/', create)
app.post('/fetch-icon', fetchIcon)
app.put('/:id', update)
app.delete('/:id', remove)

export default app
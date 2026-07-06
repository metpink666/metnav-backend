import { Hono } from 'hono'
import authRoutes from './routes/auth.js'
import categoriesRoutes from './routes/categories.js'
import bookmarksRoutes from './routes/bookmarks.js'

const app = new Hono()

app.route('/api/auth', authRoutes)
app.route('/api/categories', categoriesRoutes)
app.route('/api/bookmarks', bookmarksRoutes)

app.get('/', (c) => c.text('Hello Workers!'))

export default app
export const getAllBookmarks = async (DB) => {
  const { results } = await DB.prepare(`
    SELECT b.*, c.name as category_name, c.icon as category_icon
    FROM bookmarks b
    LEFT JOIN categories c ON b.category_id = c.id
    ORDER BY b.id
  `).all()
  return results
}

export const getBookmarksByCategory = async (DB, categoryId) => {
  const { results } = await DB.prepare(`
    SELECT b.*, c.name as category_name, c.icon as category_icon
    FROM bookmarks b
    LEFT JOIN categories c ON b.category_id = c.id
    WHERE b.category_id = ?
    ORDER BY b.id
  `).bind(categoryId).all()
  return results
}

export const getBookmarkById = async (DB, id) => {
  const result = await DB.prepare(`
    SELECT b.*, c.name as category_name, c.icon as category_icon
    FROM bookmarks b
    LEFT JOIN categories c ON b.category_id = c.id
    WHERE b.id = ?
  `).bind(id).first()
  return result || null
}

export const createBookmark = async (DB, { name, url, icon, note, categoryId }) => {
  const result = await DB.prepare(
    'INSERT INTO bookmarks (name, url, icon, note, category_id) VALUES (?, ?, ?, ?, ?)'
  ).bind(name, url, icon || '', note || '', categoryId || null).run()
  return result.meta.last_row_id
}

export const updateBookmark = async (DB, id, { name, url, icon, note, categoryId }) => {
  await DB.prepare(
    'UPDATE bookmarks SET name = ?, url = ?, icon = ?, note = ?, category_id = ? WHERE id = ?'
  ).bind(name, url, icon || '', note || '', categoryId || null, id).run()
}

export const deleteBookmark = async (DB, id) => {
  await DB.prepare('DELETE FROM bookmarks WHERE id = ?').bind(id).run()
}
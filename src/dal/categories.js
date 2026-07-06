export const getAllCategories = async (DB) => {
  const { results } = await DB.prepare('SELECT * FROM categories ORDER BY id').all()
  return results
}

export const getCategoryById = async (DB, id) => {
  const result = await DB.prepare('SELECT * FROM categories WHERE id = ?').bind(id).first()
  return result || null
}

export const createCategory = async (DB, name, icon) => {
  const result = await DB.prepare('INSERT INTO categories (name, icon) VALUES (?, ?)').bind(name, icon || '').run()
  return result.meta.last_row_id
}

export const updateCategory = async (DB, id, name, icon) => {
  await DB.prepare('UPDATE categories SET name = ?, icon = ? WHERE id = ?').bind(name, icon || '', id).run()
}

export const deleteCategory = async (DB, id) => {
  await DB.prepare('DELETE FROM categories WHERE id = ?').bind(id).run()
}
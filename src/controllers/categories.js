import * as dal from '../dal/categories.js'

export const list = async (c) => {
  const { DB } = c.env
  const data = await dal.getAllCategories(DB)
  return c.json({ success: true, data })
}

export const getOne = async (c) => {
  const id = Number(c.req.param('id'))
  const { DB } = c.env
  const data = await dal.getCategoryById(DB, id)
  if (!data) return c.json({ success: false, error: '分类不存在' })
  return c.json({ success: true, data })
}

export const create = async (c) => {
  const { name, icon } = await c.req.json()
  const { DB } = c.env
  if (!name?.trim()) return c.json({ success: false, error: '分类名称不能为空' })
  const id = await dal.createCategory(DB, name.trim(), icon || '')
  return c.json({ success: true, id })
}

export const update = async (c) => {
  const id = Number(c.req.param('id'))
  const { name, icon } = await c.req.json()
  const { DB } = c.env
  if (!name?.trim()) return c.json({ success: false, error: '分类名称不能为空' })
  await dal.updateCategory(DB, id, name.trim(), icon || '')
  return c.json({ success: true })
}

export const remove = async (c) => {
  const id = Number(c.req.param('id'))
  const { DB } = c.env
  await dal.deleteCategory(DB, id)
  return c.json({ success: true })
}
import * as dal from '../dal/bookmarks.js'

export const list = async (c) => {
  const { DB } = c.env
  const data = await dal.getAllBookmarks(DB)
  return c.json({ success: true, data })
}

export const listByCategory = async (c) => {
  const categoryId = Number(c.req.param('categoryId'))
  const { DB } = c.env
  const data = await dal.getBookmarksByCategory(DB, categoryId)
  return c.json({ success: true, data })
}

export const getOne = async (c) => {
  const id = Number(c.req.param('id'))
  const { DB } = c.env
  const data = await dal.getBookmarkById(DB, id)
  if (!data) return c.json({ success: false, error: '网址不存在' })
  return c.json({ success: true, data })
}

export const create = async (c) => {
  const { name, url, icon, note, categoryId } = await c.req.json()
  const { DB } = c.env
  if (!name?.trim()) return c.json({ success: false, error: '名称不能为空' })
  if (!url?.trim()) return c.json({ success: false, error: '网址不能为空' })
  const id = await dal.createBookmark(DB, {
    name: name.trim(),
    url: url.trim(),
    icon: icon || '',
    note: note || '',
    categoryId: categoryId || null
  })
  return c.json({ success: true, id })
}

export const update = async (c) => {
  const id = Number(c.req.param('id'))
  const { name, url, icon, note, categoryId } = await c.req.json()
  const { DB } = c.env
  if (!name?.trim()) return c.json({ success: false, error: '名称不能为空' })
  if (!url?.trim()) return c.json({ success: false, error: '网址不能为空' })
  await dal.updateBookmark(DB, id, {
    name: name.trim(),
    url: url.trim(),
    icon: icon || '',
    note: note || '',
    categoryId: categoryId || null
  })
  return c.json({ success: true })
}

export const remove = async (c) => {
  const id = Number(c.req.param('id'))
  const { DB } = c.env
  await dal.deleteBookmark(DB, id)
  return c.json({ success: true })
}

// 下载图标并转 Base64
export const fetchIcon = async (c) => {
  const { url } = await c.req.json()
  if (!url?.trim()) {
    return c.json({ success: false, error: '网址不能为空' })
  }

  try {
    // 提取域名
    const domain = url.trim().replace(/^https?:\/\//, '').split('/')[0]
    const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}`

    const response = await fetch(faviconUrl)
    if (!response.ok) {
      return c.json({ success: false, error: '获取图标失败' })
    }

    const buffer = await response.arrayBuffer()
    const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)))
    const contentType = response.headers.get('content-type') || 'image/png'
    const dataUrl = `data:${contentType};base64,${base64}`

    return c.json({ success: true, icon: dataUrl })
  } catch (error) {
    return c.json({ success: false, error: '获取图标失败' })
  }
}
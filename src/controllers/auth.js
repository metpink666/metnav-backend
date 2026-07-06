import { getPassword, updatePassword } from '../dal/auth.js'

export const login = async (c) => {
  const { password } = await c.req.json()
  const { DB } = c.env

  const stored = await getPassword(DB)
  if (!stored) {
    return c.json({ success: false, error: '系统未初始化' })
  }
  if (password === stored) {
    return c.json({ success: true })
  }
  return c.json({ success: false, error: '密码错误' })
}

export const changePassword = async (c) => {
  const { oldPassword, newPassword, confirmPassword } = await c.req.json()
  const { DB } = c.env

  if (!oldPassword || !newPassword || !confirmPassword) {
    return c.json({ success: false, error: '请完整填写所有字段' })
  }
  if (newPassword !== confirmPassword) {
    return c.json({ success: false, error: '新密码与确认密码不一致' })
  }
  if (newPassword.length < 6) {
    return c.json({ success: false, error: '新密码至少6位' })
  }

  const stored = await getPassword(DB)
  if (!stored) {
    return c.json({ success: false, error: '系统未初始化' })
  }
  if (stored !== oldPassword) {
    return c.json({ success: false, error: '旧密码错误' })
  }

  await updatePassword(DB, newPassword)
  return c.json({ success: true, message: '密码修改成功' })
}
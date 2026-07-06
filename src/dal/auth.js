export const getPassword = async (DB) => {
  const result = await DB.prepare('SELECT password FROM auth WHERE id = 1').first()
  return result?.password || null
}

export const updatePassword = async (DB, newPassword) => {
  await DB.prepare('UPDATE auth SET password = ? WHERE id = 1').bind(newPassword).run()
}
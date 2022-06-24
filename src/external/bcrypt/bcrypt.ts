import bcrypt from 'bcrypt'

const saltRound = 10

export const generateHash = async (data: string): Promise<string> => {
  return await bcrypt.hash(data, saltRound)
}

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash)
}

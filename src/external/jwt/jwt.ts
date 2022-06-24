import jwt from 'jsonwebtoken'

// const SECRETE_KEY: jwt.Secret = process.env.SECRETE_KEY

export const generateToken = (userId: string | undefined): string => {
  const token = jwt.sign({ user_id: userId },
    '18AC3E7343F016890C510E93F935261169D9E3F565436429830FAF0934F4F8E4', {
      expiresIn: 60 * 60 * 24,
    })

  return token
}

// I have to improve here
// This function be executin two times
export const validateUser = (token: string): string => {
  let id: string = ''

  jwt.verify(
    String(token),
    '18AC3E7343F016890C510E93F935261169D9E3F565436429830FAF0934F4F8E4',
    (error, decoded) => {
      if (error) {
        // console.log(error)
      }

      if (decoded === undefined) {
        return
      }
      id = (<any>decoded).user_id
    }
  )

  return id
}

import { PrismaClient } from '@prisma/client'

import { IUser, IUserUpdateData } from '../../../../domain/entities/users/interfaces/userData'
import { IUserRepository } from '../../../../app/repositories/userRepository'

export class PrismaUsersRepository implements IUserRepository {
  private prisma: PrismaClient
  public generateToken?: (token:string) => string
  public compare?: (password: string, hash: string) => Promise<boolean>

  constructor (
    hash: (password: string) => Promise<string>,
    generateToken?: (token:string) => string,
    compare?: (password: string, hash: string) => Promise<boolean>
  ) {
    this.prisma = new PrismaClient()
    this.generateToken = generateToken || undefined
    this.compare = compare || undefined
  }

  async findUserById (id: string): Promise<IUser | null> {
    const user = await this.prisma.users.findFirst({
      where: {
        user_id: id
      }
    })

    if (user === null) {
      return null
    }

    return user
  }

  async add (user: IUser): Promise<any> {
    await this.prisma.users.create({
      data: user,
    }).then(async () => {
      await this.prisma.$disconnect()
    })
      .catch(async (e) => {
        console.error(e)
        await this.prisma.$disconnect()
        process.exit(1)
      })
  }

  async update (user: IUserUpdateData, id: string): Promise<string> {
    console.log(user, id)
    await this.prisma.users.update({
      where: {
        user_id: id
      },
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      }
    })

    return 'User updated'
  }

  async getUserPermission (id: string): Promise<string[]> {
    console.log(id)
    return ['']
  }

  async authenticateUser (id: string | undefined): Promise<string> {
    return this.generateToken!(id!)
  }

  async generateDefaultPermission (userId: string, permissionId: string): Promise<void> {
    console.log(userId, permissionId)
  }

  async getPermission (id: string): Promise<string> {
    console.log(id)
    return ''
  }

  async exists (email: string): Promise<boolean> {
    const user = await this.prisma.users.findFirst({
      where: {
        email: email
      }
    })

    if (user === null) {
      return false
    }

    return true
  }

  async deleteById (url: string): Promise<void> {
    console.log(url)
  }

  // methods more used for authenticate
  async findUserByEmail (email: string): Promise<IUser | null> {
    const user = await this.prisma.users.findFirst({
      where: {
        email: email,
        NOT: this.prisma.users.fields.user_id
      }
    })

    if (user === null) {
      return null
    }

    return user
  }

  async comparePassword (password: string, hash: string): Promise<boolean> {
    return this.compare!(password, hash)
  }
}

import { AuthorData } from '../../../../domain/entities/tasks/validators/author'
import { IUserRepository } from '../../../../app/repositories/userRepository'
import { PrismaClient } from '@prisma/client'

export class PrismaUserRepository implements IUserRepository {
  private prisma: PrismaClient

  constructor () {
    this.prisma = new PrismaClient()
  }

  async findUserById (id: string): Promise<AuthorData> {
    const result = await this.prisma.user.findUnique({
      where: {
        id
      }
    })

    return (<any>result)
  }

  async getPermission (id: string): Promise<string> {
    const usersPermissions = await this.prisma.user.findUnique(
      `
        SELECT *
        FROM users_permissions
        WHERE user_id = $1`,
      [id]
    )

    const permissionsId: any[] = []

    usersPermissions.rows.forEach((column: any) => {
      permissionsId.push(column.permissions_id)
    })

    const permissionsNameToArrays = permissionsId.map(async (id: string): Promise<string> => {
      const permissions = await this.prisma.reader(
        `
          SELECT *
          FROM permissions
          WHERE permissions_id = $1`,
        [id]
      )

      return permissions.rows[0].name
    })

    let permissionsName: string = ''

    for (const value of permissionsNameToArrays) {
      permissionsName += `${(await value).toString()} `
    }

    // ESTOU RETORNANDO AS PERMISSÕES QUE UM USUÁRIO TEM
    return permissionsName.trim()
  }
}

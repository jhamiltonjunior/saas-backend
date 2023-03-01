import { AuthorData } from '../../../../domain/entities/tasks/validators/author'
import { IUserRepository } from '../../../../app/repositories/userRepository'
import { PostgresHelper } from '../helpers/postgresHelper'

export class PostgresUserRepository implements IUserRepository {
  postgresHelper: PostgresHelper

  constructor (
    connectionObject: object,
  ) {
    this.postgresHelper = new PostgresHelper(connectionObject)
  }

  async findUserById (id: string): Promise<AuthorData> {
    const result = await this.postgresHelper.query('SELECT * FROM users WHERE user_id = $1', [id])

    return result.rows[0]
  }

  async getPermission (id: string): Promise<string> {
    const usersPermissions = await this.postgresHelper.reader(
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
      const permissions = await this.postgresHelper.reader(
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

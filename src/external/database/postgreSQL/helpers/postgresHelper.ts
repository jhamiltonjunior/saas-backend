import { Pool } from 'pg'
import { IDatabase } from '../../interfaces/database'

export class PostgresHelper implements IDatabase {
  pool: Pool

  constructor (connectionObject: object) {
    this.pool = new Pool(connectionObject)
  }

  /**
   * @deprecated
   */
  async query (sql: string, values: any[]): Promise<any> {
    return this.pool.query(sql, values)
  }

  async writer (sql: string, values: any[]): Promise<any> {
    return this.pool.query(sql, values)
  }

  async reader (sql: string, values: any[]): Promise<any> {
    return this.pool.query(sql, values)
  }

  async disconnect (): Promise<void> {
    this.pool.end()
  }
}

// const n = new PostgresHelper().query('SELECT', [])

// n.then(result => result.rows[0])

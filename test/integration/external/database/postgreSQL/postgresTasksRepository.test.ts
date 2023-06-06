import { describe, after, before, it } from 'node:test'
import { strictEqual, fail } from 'node:assert'

import { PostgresTasksRepository } from '../../../../../src/external/database/postgreSQL/tasks/postgresTasksRepository'
import { connectionObject } from '../connectionObject'

describe('The integration with PostgreSQL database', () => {
  it('testing the select all columns', () => {
    const result = new PostgresTasksRepository(
      connectionObject
    ).findAllTasks()

    console.log(result)
  })
})

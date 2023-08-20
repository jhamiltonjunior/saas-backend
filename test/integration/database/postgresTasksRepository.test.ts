// import { describe, after, before, it } from 'node:test'
// import { strictEqual, fail, ok } from 'node:assert'

// import { PostgresTasksRepository } from '../../../src/external/database/postgreSQL/tasks/postgresTasksRepository'

// export const connectionObject = {
//   user: 'postgres',
//   host: '172.17.0.3',
//   database: 'postgres',
//   password: '0000',
//   port: 5432,
// }

// describe('The integration with PostgreSQL database', () => {
//   it('Return should be a object', async () => {
//     const result = new PostgresTasksRepository(
//       connectionObject
//     ).findAllTasks()

//     strictEqual(typeof result, typeof Object())
//   })

//   it('Should be possible get informations', async () => {
//     const result = new PostgresTasksRepository(
//       connectionObject
//     ).findAllTasks()

//     strictEqual(typeof (<any>(await result)[0]).tasks_id, typeof String())
//   })
// })

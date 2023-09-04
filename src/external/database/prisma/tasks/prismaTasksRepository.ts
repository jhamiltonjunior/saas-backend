import { PrismaClient } from '@prisma/client'

import { ITasksData, ITasksUpdateData } from '../../../../domain/entities/tasks/interfaces/tasksData'
import { ITasksRepository } from '../../../../app/repositories/tasksRepository'

export class PrismaTasksRepository implements ITasksRepository {
  private prisma: PrismaClient

  constructor () {
    this.prisma = new PrismaClient()
  }

  async findAllTasks (): Promise<ITasksData[]> {
    const allUsers = await this.prisma.tasks.findMany()

    return allUsers
  }

  async findByURL (url: string): Promise<ITasksData | null> {
    const task = await this.prisma.tasks.findUnique({
      where: {
        url
      }
    })

    return task
  }

  async deleteByURL (id: string): Promise<void> {
    console.log(id)
  }

  async add (task: ITasksData): Promise<any> {
    await this.prisma.tasks.create({
      data: task,
    }).then(async () => {
      await this.prisma.$disconnect()
    })
      .catch(async (e) => {
        console.error(e)
        await this.prisma.$disconnect()
        process.exit(1)
      })
  }

  async update (tasks: ITasksUpdateData, url: string): Promise <void> {
    await this.prisma.tasks.update({
      where: {
        url
      },
      data: {
        indice: tasks.indice,
        title: tasks.title,
        description: tasks.description,
        tag: tasks.tag,
        url: tasks.url,
        updated_at: tasks.updated_at,
        task_is_active: tasks.task_is_active,
        list_id: tasks.list_id,
      }
    })
  }

  async getUserPermission (id: string): Promise<string[]> {
    console.log(id)
    return ['']
  }
}

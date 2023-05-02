import { PrismaClient } from '@prisma/client'

import { ITasksData } from '../../../../domain/entities/tasks/interfaces/tasksData'
import { ITasksRepository } from '../../../../app/repositories/tasksRepository'

export class PrismaRepository implements ITasksRepository {
  private prisma: PrismaClient

  constructor () {
    this.prisma = new PrismaClient()
  }

  async findAllTasks (): Promise<ITasksData[]> {
    return []
  }

  async findByURL (url: string): Promise<ITasksData> {
    const tasks = await this.prisma.tasks.findFirst({
      where: (<any>url)
    })

    return (<any>tasks)
  }

  async deleteByURL (id: string): Promise<void> {
    console.log(id)
  }

  async add (tasks: ITasksData, id: string): Promise<void> {
    await this.prisma.tasks.create({
      data: {
        title: tasks.title,
        description: 'text',
        link: 'String',
        published: false,
        videoTime: 642,
        createdAt: new Date(),
        author: (<any>id),
        authorId: 'ie'
      },
    }).then(async () => {
      await this.prisma.$disconnect()
    })
      .catch(async (e) => {
        console.error(e)
        await this.prisma.$disconnect()
        process.exit(1)
      })
  }

  async update (tasks: ITasksData, url: string): Promise < void> {
    console.log(tasks, url)
  }
}

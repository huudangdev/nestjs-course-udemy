import { Injectable, Query, NotFoundException } from '@nestjs/common';
import { CreateTaskDTO } from './dto/tasks.create.dto';
import { FilterTasksDTO } from './dto/tasks.filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './tasks.repository';
import { Task } from './tasks.entity';
import { TaskStatus } from './tasks.status.enum';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ) {}

  async getTasks (filterTasksDTO: FilterTasksDTO) : Promise<Task[]> {
    return this.taskRepository.getTasks(filterTasksDTO)
  }

  async createTask (createTaskDTO: CreateTaskDTO): Promise<Task> {
    return this.taskRepository.createTask(createTaskDTO)
  }


  async getTaskById (id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id)

    if (!found) {
      throw new NotFoundException(`The task with id ${id} not found`)
    }

    return found
  }

  async updateTaskStatus (id: number, status: TaskStatus): Promise<Task> {
    const taskFound = await this.getTaskById(id)
    taskFound.status = status
    await taskFound.save()
    return taskFound
  }

  async deleteTaskById (id: number): Promise<Task> {
    const found = this.getTaskById(id)

    await this.taskRepository.delete(id)

    return found
  }
}

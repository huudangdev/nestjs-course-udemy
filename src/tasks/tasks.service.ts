import { Injectable, Query, NotFoundException } from '@nestjs/common';
import * as uuid from 'uuid/v1'
import { CreateTaskDTO } from './dto/tasks.create.dto';
import { UpdateTaskDTO } from './dto/tasks.update.dto';
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

  // getAllTasks (): Task[] {
  //   return this.tasks
  // }

  // getFilterTasks (status: TaskStatus, searchTerm: string): Task[] {
  //   let tasks = this.getAllTasks()

  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status)
  //   }

  //   if (searchTerm) {
  //     tasks.map((task) => console.log(task.title.search(new RegExp(searchTerm, 'i'))))
  //     tasks = tasks.filter((task) => task.title.search(new RegExp(searchTerm, 'i')) !== -1 || task.description.search(new RegExp(searchTerm, 'i')) !== -1)
  //   }

  //   return tasks
  // }

  async createTask (createTaskDTO: CreateTaskDTO): Promise<Task> {
    const {title, description} = createTaskDTO
    const createTask = await this.taskRepository.create({
      title,
      description,
      status: TaskStatus.TODO
    })
    return createTask
  }


  async getTaskById (id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id)

    if (!found) {
      throw new NotFoundException(`The task with id ${id} not found`)
    }

    return found
  }

  // updateStatusTask (id: string, status: TaskStatus): Task {
  //   if (!TaskStatus[status]) return
  //   const task = this.getTaskById(id)
  //   task.status = status
  //   return task
  // }

  // deleteTaskById (id: string): void {
  //   const found = this.getTaskById(id)

  //   this.tasks = this.tasks.filter((task) => task.id !== found.id)
  // }
}

import { Injectable, Query, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import * as uuid from 'uuid/v1'
import { CreateTaskDTO } from './dto/tasks.create.dto';
import { UpdateTaskDTO } from './dto/tasks.update.dto';
import { FilterTasksDTO } from './dto/tasks.filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = []

  getAllTasks (): Task[] {
    return this.tasks
  }

  getFilterTasks (status: TaskStatus, searchTerm: string): Task[] {
    let tasks = this.getAllTasks()

    if (status) {
      tasks = tasks.filter((task) => task.status === status)
    }

    if (searchTerm) {
      tasks.map((task) => console.log(task.title.search(new RegExp(searchTerm, 'i'))))
      tasks = tasks.filter((task) => task.title.search(new RegExp(searchTerm, 'i')) !== -1 || task.description.search(new RegExp(searchTerm, 'i')) !== -1)
    }

    return tasks
  }

  createTask (createTaskDTO: CreateTaskDTO) : Task {
    const {title, description} = createTaskDTO
    
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.TODO
    }
    this.tasks.push(task)
    return task
  }

  getTaskById (id: string): Task {
    const found = this.tasks.find(task => task.id === id ? task : 0)

    if (!found) {
      throw new NotFoundException(`The task with id ${id} not found`)
    }

    return found
  }

  updateStatusTask (id: string, status: TaskStatus): Task {
    if (!TaskStatus[status]) return
    const task = this.getTaskById(id)
    task.status = status
    return task
  }

  deleteTaskById (id: string): void {
    const found = this.getTaskById(id)

    this.tasks = this.tasks.filter((task) => task.id !== found.id)
  }
}

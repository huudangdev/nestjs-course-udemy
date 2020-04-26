import { Injectable, Query } from '@nestjs/common';
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
    return this.tasks.find(task => task.id === id ? task : 0)
  }

  updateStatusTask (id: string, updateTask: UpdateTaskDTO): Task {
    const {status} = updateTask
    if (!TaskStatus[status]) return
    return this.tasks.find((task) => task.id === id ? task : null).status = TaskStatus[status]
  }

  deleteTaskById (id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id)
  }
}

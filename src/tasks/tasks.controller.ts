import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import {TasksService} from './tasks.service'
import { Task } from './tasks.model';
import { CreateTaskDTO } from './dto/tasks.create.dto';
import { UpdateTaskDTO } from './dto/tasks.update.dto';
import { FilterTasksDTO } from './dto/tasks.filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(@Query() filterTasksDTO: FilterTasksDTO): Task[] {
    if (Object.keys(filterTasksDTO).length) {
      const {status, searchTerm} = filterTasksDTO
      return this.taskService.getFilterTasks(status, searchTerm)
    }

    return this.taskService.getAllTasks()
  }

  @Post()
  createTask(@Body() createTaskDTO: CreateTaskDTO): Task {
    return this.taskService.createTask(createTaskDTO)
  }

  @Get('/:id')
  getTaskById(
    @Param('id') id: string
  ): Task {
    return this.taskService.getTaskById(id)
  }

  @Put('/:id')
  updateTask(
    @Param('id') id: string,
    @Body() updateTaskDTO: UpdateTaskDTO
  ): Task {
    return this.taskService.updateStatusTask(id, updateTaskDTO)
  }

  @Delete('/:id')
  deleteTaskById(
    @Param('id') id: string
  ): void {
    this.taskService.deleteTaskById(id)
  }
}

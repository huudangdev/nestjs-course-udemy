import { Controller, Get, Post, Body, Put, Param, Delete, Query, ValidationPipe, UsePipes } from '@nestjs/common';
import {TasksService} from './tasks.service'
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDTO } from './dto/tasks.create.dto';
import { FilterTasksDTO } from './dto/tasks.filter.dto';
import { TaskStatusValidationPipe } from './pipes/tasks.status.validation.pipe';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(@Query(ValidationPipe) filterTasksDTO: FilterTasksDTO): Task[] {
    if (Object.keys(filterTasksDTO).length) {
      const {status, searchTerm} = filterTasksDTO
      return this.taskService.getFilterTasks(status, searchTerm)
    }

    return this.taskService.getAllTasks()
  }

  @Post()
  @UsePipes(ValidationPipe)
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
    @Body('status', TaskStatusValidationPipe) status: TaskStatus
  ): Task {
    return this.taskService.updateStatusTask(id, status)
  }

  @Delete('/:id')
  deleteTaskById(
    @Param('id') id: string
  ): void {
    this.taskService.deleteTaskById(id)
  }
}

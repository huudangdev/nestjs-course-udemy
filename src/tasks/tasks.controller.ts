import { Controller, Get, Post, Body, Put, Param, Delete, Query, ValidationPipe, UsePipes, ParseIntPipe } from '@nestjs/common';
import {TasksService} from './tasks.service'
import { CreateTaskDTO } from './dto/tasks.create.dto';
import { FilterTasksDTO } from './dto/tasks.filter.dto';
import { TaskStatusValidationPipe } from './pipes/tasks.status.validation.pipe';
import { Task } from './tasks.entity';
import { TaskStatus } from './tasks.status.enum';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(@Query(ValidationPipe) filterTasksDTO: FilterTasksDTO): Promise<Task[]> {
    return this.taskService.getTasks(filterTasksDTO)
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDTO: CreateTaskDTO): Promise<Task> {
    return this.taskService.createTask(createTaskDTO)
  }

  @Get('/:id')
  getTaskById(
    @Param('id', ParseIntPipe) id: number
  ): Promise<Task> {
    return this.taskService.getTaskById(id)
  }

  @Put('/:id')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus
  ): Promise<Task> {
    return this.taskService.updateTaskStatus(id, status)
  }

  @Delete('/:id')
  deleteTaskById(
    @Param('id', ParseIntPipe) id: number
  ): Promise<Task> {
    return this.taskService.deleteTaskById(id)
  }
}

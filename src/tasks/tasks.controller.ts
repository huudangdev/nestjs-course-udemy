import { Controller, Get, Post, Body, Put, Param, Delete, Query, ValidationPipe, UsePipes, ParseIntPipe } from '@nestjs/common';
import {TasksService} from './tasks.service'
import { CreateTaskDTO } from './dto/tasks.create.dto';
import { FilterTasksDTO } from './dto/tasks.filter.dto';
import { TaskStatusValidationPipe } from './pipes/tasks.status.validation.pipe';
import { Task } from './tasks.entity';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  // @Get()
  // getAllTasks(@Query(ValidationPipe) filterTasksDTO: FilterTasksDTO): Task[] {
  //   if (Object.keys(filterTasksDTO).length) {
  //     const {status, searchTerm} = filterTasksDTO
  //     return this.taskService.getFilterTasks(status, searchTerm)
  //   }

  //   return this.taskService.getAllTasks()
  // }

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

  // @Put('/:id')
  // updateTask(
  //   @Param('id') id: string,
  //   @Body('status', TaskStatusValidationPipe) status: TaskStatus
  // ): Task {
  //   return this.taskService.updateStatusTask(id, status)
  // }

  // @Delete('/:id')
  // deleteTaskById(
  //   @Param('id') id: string
  // ): void {
  //   this.taskService.deleteTaskById(id)
  // }
}

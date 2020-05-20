import { Controller, Get, Post, Body, Put, Param, Delete, Query, ValidationPipe, UsePipes, ParseIntPipe, UseGuards, Patch } from '@nestjs/common';
import {TasksService} from './tasks.service'
import { CreateTaskDTO } from './dto/tasks.create.dto';
import { FilterTasksDTO } from './dto/tasks.filter.dto';
import { TaskStatusValidationPipe } from './pipes/tasks.status.validation.pipe';
import { Task } from './tasks.entity';
import { TaskStatus } from './tasks.status.enum';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get.user.decorator';
import { User } from 'src/auth/users.entity';

@UseGuards(AuthGuard())
@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(
    @Query(ValidationPipe) filterTasksDTO: FilterTasksDTO,
    @GetUser() user: User
  ): Promise<Task[]> {
    return this.taskService.getTasks(filterTasksDTO, user)
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTaskDTO: CreateTaskDTO,
    @GetUser() user: User
  ): Promise<Task> {
    return this.taskService.createTask(createTaskDTO, user)
  }

  @Get('/:id')
  getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User
  ): Promise<Task> {
    return this.taskService.getTaskById(id, user)
  }

  @Patch('/:id')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    @GetUser() user: User
  ): Promise<Task> {
    return this.taskService.updateTaskStatus(id, status, user)
  }

  @Delete('/:id')
  deleteTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User
  ): Promise<Task> {
    return this.taskService.deleteTaskById(id, user)
  }
}

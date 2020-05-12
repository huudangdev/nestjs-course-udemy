import { EntityRepository, Repository } from 'typeorm';
import { Task } from './tasks.entity';
import { FilterTasksDTO } from './dto/tasks.filter.dto';
import { CreateTaskDTO } from './dto/tasks.create.dto';
import { TaskStatus } from './tasks.status.enum';
import { User } from 'src/auth/users.entity';


@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasks (filterTasksDTO: FilterTasksDTO) : Promise<Task[]> {
    const {status, searchTerm } = filterTasksDTO

    const query = this.createQueryBuilder('task')

    if (status) {
      query.andWhere('task.status = :status', {status})
    }

    if (searchTerm) {
      query.andWhere('(task.title LIKE :searchTerm OR task.description LIKE :searchTerm)', {searchTerm: `%${searchTerm}%`})
    }

    const tasks = await query.getMany()

    return tasks
  }

  async createTask (createTaskDTO: CreateTaskDTO, user: User): Promise<Task> {
    const {title, description} = createTaskDTO
    const newTask = new Task()
    newTask.title = title
    newTask.description = description
    newTask.status = TaskStatus.TODO
    newTask.user = user
    await newTask.save()

    delete newTask.user

    return newTask
  } 
}

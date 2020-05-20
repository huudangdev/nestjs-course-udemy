import { TaskStatus } from "../tasks.status.enum";
import { IsOptional, IsIn, IsNotEmpty } from "class-validator";

export class FilterTasksDTO {
  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
  status: TaskStatus;
  
  @IsOptional()
  @IsNotEmpty()
  searchTerm: string
}
import { TaskStatus } from "../tasks.model";
import { IsOptional, IsIn, IsNotEmpty } from "class-validator";

export class FilterTasksDTO {
  @IsOptional()
  @IsIn([TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
  status: TaskStatus;
  
  @IsOptional()
  @IsNotEmpty()
  searchTerm: string
}
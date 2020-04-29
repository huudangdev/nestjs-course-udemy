import { TaskStatus } from "../tasks.model";
import { UsePipes } from "@nestjs/common";
import { TaskStatusValidationPipe } from "../pipes/tasks.status.validation.pipe";

export class UpdateTaskDTO {
  @UsePipes(new TaskStatusValidationPipe())
  status: TaskStatus
}
import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../tasks.model";

export class TaskStatusValidationPipe implements PipeTransform {
  readonly AllowedStatus = [
    TaskStatus.TODO,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE
  ]
  
  transform(value: any) {
    value = value.toUpperCase()
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`The status ${value} is not already`)
    }
    return value
  }

  private isStatusValid (status: any) {
    const idx = this.AllowedStatus.indexOf(status)
    return idx !== -1
  }
}
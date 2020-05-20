import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../tasks.status.enum";

export class TaskStatusValidationPipe implements PipeTransform {
  readonly AllowedStatus = [
    TaskStatus.OPEN,
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
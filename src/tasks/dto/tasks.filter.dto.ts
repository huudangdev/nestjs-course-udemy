import { TaskStatus } from "../tasks.model";

export class FilterTasksDTO {
  status: TaskStatus;
  searchTerm: string
}
export interface Task {
  id: String,
  title: String,
  description: String,
  status: TaskStatus
}

export enum TaskStatus {
  TODO = 'TO DO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE'
}
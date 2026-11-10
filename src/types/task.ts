// Les trois états possibles d'une tâche
export enum Status {
  ToDo = 'to do',
  InProgress = 'in progress',
  Done = 'done',
}

// La forme d'une tâche
export interface Task {
  id: number
  title: string
  status: Status
}

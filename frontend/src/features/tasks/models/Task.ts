/**
 * Task data model
 */
export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

/**
 * Data required to create a new task
 */
export interface CreateTaskData {
  title: string;
}


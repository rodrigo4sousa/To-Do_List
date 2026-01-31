import { api } from '../../../shared/api/http';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export interface CreateTaskData {
  title: string;
}

export class TaskRepository {
  async getTasks(): Promise<Task[]> {
    return api.get('/tasks');
  }

  async createTask(data: CreateTaskData): Promise<Task> {
    return api.post('/tasks', data);
  }

  async completeTask(id: string): Promise<Task> {
    return api.patch(`/tasks/${id}`);
  }

  async deleteTask(id: string): Promise<void> {
    return api.delete(`/tasks/${id}`);
  }
}

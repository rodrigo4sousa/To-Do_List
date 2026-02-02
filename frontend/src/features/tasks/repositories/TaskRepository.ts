import { api } from '../../../shared/api/http';
import { Task, CreateTaskData } from '../models/Task';

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


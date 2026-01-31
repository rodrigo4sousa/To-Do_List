import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { TaskRepository, Task, CreateTaskData } from '../repositories/TaskRepository';

const taskRepository = new TaskRepository();

export const useTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: () => taskRepository.getTasks(),
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateTaskData) => taskRepository.createTask(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

export const useCompleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => taskRepository.completeTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => taskRepository.deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/src/features/auth/store/useAuthStore';
import {
  useTasks,
  useCreateTask,
  useCompleteTask,
  useDeleteTask,
} from '../../features/tasks/services/TaskService';

export default function TasksPage() {
  const router = useRouter();
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const { user, isAuthenticated, loading } = useAuthStore();

  const { data: tasks, isLoading, error } = useTasks(isAuthenticated);
  const createTaskMutation = useCreateTask();
  const completeTaskMutation = useCompleteTask();
  const deleteTaskMutation = useDeleteTask();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/');
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      createTaskMutation.mutate({ title: newTaskTitle });
      setNewTaskTitle('');
    }
  };

  const handleCompleteTask = (id: string) => { 
    completeTaskMutation.mutate(id); 
  }; 
  const handleDeleteTask = (id: string) => { 
    deleteTaskMutation.mutate(id);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>

      <form onSubmit={handleCreateTask} className="mb-4">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="New task title"
          className="border p-2 mr-2"
        />
        <button
          type="submit"
          disabled={createTaskMutation.isPending}
          className="bg-blue-500 text-white px-4 py-2"
        >
          {createTaskMutation.isPending ? 'Adding...' : 'Add Task'}
        </button>
      </form>

      {error && <div className="text-red-500 mb-4">{error.message}</div>}

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2 text-left">Title</th>
            <th className="border border-gray-300 p-2 text-left">Status</th>
            <th className="border border-gray-300 p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={3} className="border border-gray-300 p-4 text-center">
                Loading...
              </td>
            </tr>
          ) : tasks && tasks.length > 0 ? (
            tasks.map((task) => (
              <tr key={task.id} className="border border-gray-300">
                <td className={`border border-gray-300 p-2 ${task.completed ? 'line-through' : ''}`}>{task.title}</td>
                <td className="border border-gray-300 p-2">{task.completed ? 'Completed' : 'Pending'}</td>
                <td className="border border-gray-300 p-2">
                  {!task.completed && (
                    <button
                      onClick={() => handleCompleteTask(task.id)}
                      disabled={completeTaskMutation.isPending}
                      className="bg-green-500 text-white px-2 py-1 mr-2"
                    >
                      Complete
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    disabled={deleteTaskMutation.isPending}
                    className="bg-red-500 text-white px-2 py-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="border border-gray-300 p-4 text-center text-gray-500">
                No tasks yet. Create your first task above!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

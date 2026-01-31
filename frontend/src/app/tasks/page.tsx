'use client';

import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../../features/auth/context/AuthContext';
import { useTasks, useCreateTask, useCompleteTask, useDeleteTask } from '../../features/tasks/services/TaskService';

export default function TasksPage() {
  const { user } = useContext(AuthContext)!;
  const router = useRouter();
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const { data: tasks, isLoading, error } = useTasks();
  const createTaskMutation = useCreateTask();
  const completeTaskMutation = useCompleteTask();
  const deleteTaskMutation = useDeleteTask();

  if (!user) {
    router.push('/');
    return null;
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

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

      <ul>
        {tasks?.map((task) => (
          <li key={task.id} className="flex items-center justify-between p-2 border mb-2">
            <span className={task.completed ? 'line-through' : ''}>{task.title}</span>
            <div>
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
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

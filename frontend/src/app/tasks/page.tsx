'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/src/features/auth/store/useAuthStore';
import {
  useTasks,
  useCreateTask,
  useCompleteTask,
  useDeleteTask,
} from '../../features/tasks/services/TaskService';
import { Task } from '@/src/features/tasks/models/Task';
import styles from './tasks.module.css';

type FilterType = 'all' | 'pending' | 'completed';

export default function TasksPage() {
  const router = useRouter();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const { user, isAuthenticated, loading, logout } = useAuthStore();

  const { data: tasks, isLoading, error } = useTasks(isAuthenticated);
  const createTaskMutation = useCreateTask();
  const completeTaskMutation = useCompleteTask();
  const deleteTaskMutation = useDeleteTask();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, router]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dialog with Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isDialogOpen) {
        setIsDialogOpen(false);
        setSelectedTask(null);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isDialogOpen]);

  // Reset to page 1 when filter changes or items per page changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter, itemsPerPage]);

  if (loading) {
    return (
      <div className={styles.loadingWrapper}>
        <div className={styles.loadingContent}>
          <div className={styles.spinner}></div>
          <span className={styles.loadingText}>Loading...</span>
        </div>
      </div>
    );
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

  const handleOpenTaskDialog = (task: Task) => {
    setSelectedTask(task);
    setIsDialogOpen(true);
  };

  const handleCloseTaskDialog = () => {
    setIsDialogOpen(false);
    setSelectedTask(null);
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  // Filter tasks based on selected filter
  const filteredTasks = tasks?.filter((task) => {
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  // Pagination logic
  const totalItems = filteredTasks?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTasks = filteredTasks?.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return 'U';
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logoSection}>
            <div className={styles.logoIcon}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h1 className={styles.pageTitle}>My Tasks</h1>
          </div>

          {/* User Menu */}
          <div className={styles.userMenuWrapper} ref={userMenuRef}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className={styles.userMenuButton}
            >
              <div className={styles.userAvatar}>
                {getUserInitials()}
              </div>
              <svg className={`${styles.chevronIcon} ${isUserMenuOpen ? styles.open : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isUserMenuOpen && (
              <div className={styles.userMenuDropdown}>
                <div className={styles.userInfoSection}>
                  <div className={styles.userInfoContent}>
                    <div className={styles.userAvatarLarge}>
                      {getUserInitials()}
                    </div>
                    <div className={styles.userDetails}>
                      <p className={styles.userEmail}>{user?.email}</p>
                    </div>
                  </div>
                </div>
                <div className={styles.menuActions}>
                  <button onClick={handleLogout} className={styles.logoutButton}>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className={styles.main}>
        {/* Task Creation Form */}
        <form onSubmit={handleCreateTask} className={styles.taskForm}>
          <div className={styles.taskFormInner}>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="What needs to be done?"
                className={styles.taskInput}
                maxLength={500}
              />
              <div className={styles.characterCounter}>
                {newTaskTitle.length}/500
              </div>
            </div>
            <button
              type="submit"
              disabled={createTaskMutation.isPending || !newTaskTitle.trim()}
              className={styles.addButton}
            >
              {createTaskMutation.isPending ? (
                <>
                  <div className={styles.spinnerSmall}></div>
                  Adding...
                </>
              ) : (
                <>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Task
                </>
              )}
            </button>
          </div>
        </form>

        {/* Filter Tabs */}
        <div className={styles.filterWrapper}>
          <div className={styles.filterTabs}>
            {[
              { key: 'all', label: 'All', count: tasks?.length || 0 },
              { key: 'pending', label: 'Pending', count: tasks?.filter(t => !t.completed).length || 0 },
              { key: 'completed', label: 'Completed', count: tasks?.filter(t => t.completed).length || 0 },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key as FilterType)}
                className={`${styles.filterTab} ${filter === tab.key ? styles.filterTabActive : ''}`}
              >
                {tab.label}
                <span className={filter === tab.key ? styles.filterCountActive : styles.filterCountInactive}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className={styles.errorMessage}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error.message}
          </div>
        )}

        {/* Tasks Table */}
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHeader}>
                <th className={`${styles.tableHeaderCell} ${styles.tableHeaderCellTask}`}>Task</th>
                <th className={`${styles.tableHeaderCell} ${styles.tableHeaderCellStatus}`}>Status</th>
                <th className={`${styles.tableHeaderCell} ${styles.tableHeaderCellActions}`}>Actions</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {isLoading ? (
                <tr>
                  <td colSpan={3} className={styles.tableCellCenter}>
                    <div className={styles.loadingState}>
                      <div className={styles.spinnerMedium}></div>
                      <span className={styles.loadingStateText}>Loading tasks...</span>
                    </div>
                  </td>
                </tr>
              ) : paginatedTasks && paginatedTasks.length > 0 ? (
                paginatedTasks.map((task) => (
                  <tr key={task.id} className={styles.tableRow} onClick={() => handleOpenTaskDialog(task)}>
                    <td className={styles.tableCell}>
                      <div className={styles.taskContent}>
                        <div className={`${styles.taskCheckbox} ${task.completed ? styles.taskCheckboxCompleted : ''}`}>
                          {task.completed && (
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className={`${styles.taskTitle} ${task.completed ? styles.taskTitleCompleted : ''}`}>
                          {task.title}
                        </span>
                      </div>
                    </td>
                    <td className={styles.tableCell}>
                      <span className={`${styles.statusBadge} ${task.completed ? styles.statusBadgeCompleted : styles.statusBadgePending}`}>
                        {task.completed ? 'Completed' : 'Pending'}
                      </span>
                    </td>
                    <td className={`${styles.tableCell} ${styles.tableCellActions}`}>
                      <div className={styles.actionsWrapper}>
                        {!task.completed && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCompleteTask(task.id);
                            }}
                            disabled={completeTaskMutation.isPending}
                            className={`${styles.actionButton} ${styles.completeButton}`}
                          >
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Complete
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteTask(task.id);
                          }}
                          disabled={deleteTaskMutation.isPending}
                          className={`${styles.actionButton} ${styles.deleteButton}`}
                        >
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className={styles.tableCellCenter}>
                    <div className={styles.emptyState}>
                      <div className={styles.emptyIcon}>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <div>
                        <p className={styles.emptyTitle}>No tasks found</p>
                        <p className={styles.emptyDescription}>
                          {filter === 'all'
                            ? 'Create your first task above to get started!'
                            : filter === 'pending'
                            ? 'No pending tasks. Great job!'
                            : 'No completed tasks yet.'}
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredTasks && filteredTasks.length > 0 && (
          <div className={styles.paginationWrapper}>
            <div className={styles.paginationInfo}>
              <span>Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems}</span>
            </div>
            
            <div className={styles.paginationControls}>
              <div className={styles.itemsPerPage}>
                <label htmlFor="itemsPerPage">Items per page:</label>
                <select
                  id="itemsPerPage"
                  value={itemsPerPage}
                  onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                  className={styles.itemsPerPageSelect}
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>

              <div className={styles.pageButtons}>
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                  className={styles.pageButton}
                  title="First page"
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={styles.pageButton}
                  title="Previous page"
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <span className={styles.pageIndicator}>
                  Page {currentPage} of {totalPages}
                </span>
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={styles.pageButton}
                  title="Next page"
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <button
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                  className={styles.pageButton}
                  title="Last page"
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Task Stats */}
        {tasks && tasks.length > 0 && (
          <div className={styles.taskStats}>
            {tasks.filter(t => t.completed).length} of {tasks.length} tasks completed
          </div>
        )}
      </main>

      {/* Task Dialog */}
      {isDialogOpen && selectedTask && (
        <div className={styles.dialogOverlay} onClick={handleCloseTaskDialog}>
          <div className={styles.dialogContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.dialogHeader}>
              <h2 className={styles.dialogTitle}>Task Details</h2>
              <button
                onClick={handleCloseTaskDialog}
                className={styles.dialogCloseButton}
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className={styles.dialogBody}>
              <div className={styles.taskDetail}>
                <label className={styles.taskDetailLabel}>Title</label>
                <p className={styles.taskDetailTitle}>{selectedTask.title}</p>
              </div>

              <div className={styles.taskDetail}>
                <label className={styles.taskDetailLabel}>Status</label>
                <span className={`${styles.statusBadge} ${selectedTask.completed ? styles.statusBadgeCompleted : styles.statusBadgePending}`}>
                  {selectedTask.completed ? 'Completed' : 'Pending'}
                </span>
              </div>
            </div>

            <div className={styles.dialogActions}>
              {!selectedTask.completed && (
                <button
                  onClick={() => {
                    handleCompleteTask(selectedTask.id);
                    handleCloseTaskDialog();
                  }}
                  disabled={completeTaskMutation.isPending}
                  className={`${styles.actionButton} ${styles.completeButton}`}
                >
                  {completeTaskMutation.isPending ? (
                    <>
                      <div className={styles.spinnerSmall}></div>
                      Completing...
                    </>
                  ) : (
                    <>
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Complete Task
                    </>
                  )}
                </button>
              )}

              <button
                onClick={() => {
                  handleDeleteTask(selectedTask.id);
                  handleCloseTaskDialog();
                }}
                disabled={deleteTaskMutation.isPending}
                className={`${styles.actionButton} ${styles.deleteButton}`}
              >
                {deleteTaskMutation.isPending ? (
                  <>
                    <div className={styles.spinnerSmall}></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete Task
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

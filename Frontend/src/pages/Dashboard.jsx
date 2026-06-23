import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { tasksAPI } from '../api/client';

const Dashboard = () => {
  const { user, logout, handleAuthError } = useAuth();
  const [tasks, setTasks]   = useState([]);
  const [newTask, setNewTask] = useState('');
  const [taskLoading, setTaskLoading] = useState(true);
  const [addingTask, setAddingTask]   = useState(false);
  const [taskError, setTaskError]     = useState(null);

  
  const fetchTasks = useCallback(async () => {
    try {
      setTaskLoading(true);
      const { tasks: fetched } = await tasksAPI.getAll();
      setTasks(fetched);
    } catch (err) {
      handleAuthError(err);
      if (err.status !== 401) setTaskError('Failed to load tasks.');
    } finally {
      setTaskLoading(false);
    }
  }, [handleAuthError]);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setAddingTask(true);
    try {
      const { task } = await tasksAPI.create(newTask.trim());
      setTasks((t) => [task, ...t]);
      setNewTask('');
    } catch (err) {
      handleAuthError(err);
      if (err.status !== 401) setTaskError('Failed to create task.');
    } finally {
      setAddingTask(false);
    }
  };

  const handleToggle = async (id) => {
    try {
      const { task } = await tasksAPI.toggle(id);
      setTasks((ts) => ts.map((t) => (t.id === id ? task : t)));
    } catch (err) {
      handleAuthError(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await tasksAPI.delete(id);
      setTasks((ts) => ts.filter((t) => t.id !== id));
    } catch (err) {
      handleAuthError(err);
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="dashboard-brand">
          <span className="brand-icon"></span>
          <span className="brand-name">SecureAuth</span>
        </div>
        <div className="user-info">
          <span> {user?.name}</span>
          <button className="btn-logout" onClick={logout}>
            Sign out
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <section className="welcome-section">
          <h1>Your Tasks</h1>
          <p className="subtitle">
            Protected by JWT authentication — only you can see this.
          </p>
          <div className="jwt-badge">
            <span className="badge-dot" />
            Authenticated session active
          </div>
        </section>

        {/* Add task form */}
        <form onSubmit={handleAddTask} className="add-task-form">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task…"
            disabled={addingTask}
          />
          <button type="submit" disabled={addingTask || !newTask.trim()}>
            {addingTask ? '…' : '+ Add'}
          </button>
        </form>

        {taskError && (
          <div className="alert alert-error">⚠ {taskError}</div>
        )}

        {/* Task list */}
        <div className="task-list">
          {taskLoading ? (
            <div className="task-placeholder">Loading tasks…</div>
          ) : tasks.length === 0 ? (
            <div className="task-empty">
              <span>📋</span>
              <p>No tasks yet. Add one above to get started.</p>
            </div>
          ) : (
            tasks.map((task) => (
              <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                <button
                  className="task-check"
                  onClick={() => handleToggle(task.id)}
                  title={task.completed ? 'Mark incomplete' : 'Mark complete'}
                >
                  {task.completed ? '✅' : '⭕'}
                </button>
                <span className="task-title">{task.title}</span>
                <button
                  className="task-delete"
                  onClick={() => handleDelete(task.id)}
                  title="Delete task"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        <details className="debug-panel">
          <summary>🔍 Auth Debug Info</summary>
          <div className="debug-content">
            <div className="debug-row">
              <span>User ID</span>
              <code>{user?._id || '—'}</code>
            </div>
            <div className="debug-row">
              <span>Email</span>
              <code>{user?.email || '—'}</code>
            </div>
            <div className="debug-row">
              <span>JWT in localStorage</span>
              <code className="token-preview">
                {localStorage.getItem('auth_token')
                  ? localStorage.getItem('auth_token').substring(0, 40) + '…'
                  : 'Not found'}
              </code>
            </div>
          </div>
        </details>
      </main>
    </div>
  );
};

export default Dashboard;

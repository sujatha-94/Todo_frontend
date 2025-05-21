import React, { useEffect, useState } from 'react';
import { fetchTodos, addTodo, deleteTodo, summarizeTodos } from './api';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import SummaryButton from './components/SummaryButton';

function App() {
  const [todos, setTodos] = useState([]);
  const [alert, setAlert] = useState('');

  const loadTodos = async () => {
    const res = await fetchTodos();
    setTodos(res.data);
  };

  useEffect(() => { loadTodos(); }, []);

  const handleAdd = async (task) => {
    await addTodo(task);
    loadTodos();
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    loadTodos();
  };

  const handleSummary = async () => {
    try {
      const res = await summarizeTodos();
      setAlert('✅ Summary sent to Slack!');
    } catch {
      setAlert('❌ Failed to send summary');
    } finally {
      setTimeout(() => setAlert(''), 3000);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      
      {alert && <div className="mb-4 text-green-600 font-semibold">{alert}</div>}
      <TodoForm onAdd={handleAdd} />
      <TodoList todos={todos} onDelete={handleDelete} />
      <SummaryButton onClick={handleSummary} />
    </div>
  );
}

export default App;

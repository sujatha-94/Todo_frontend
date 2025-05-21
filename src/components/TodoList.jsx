
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [summary, setSummary] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingTask, setEditingTask] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get('http://localhost:4000/todos');
      setTodos(res.data);
    } catch (err) {
      console.error('Error loading todos:', err);
    }
  };

  const handleAddTodo = async () => {
    if (!task.trim()) return;

    const newTodo = {
      id: Date.now().toString(),
      task,
      completed: false,
    };

    try {
      const res = await axios.post('http://localhost:4000/todos', newTodo);
      setTodos([...todos, res.data]);
      setTask('');
    } catch (err) {
      console.error('Error adding todo:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/todos/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };

  const handleEdit = (id, task) => {
    setEditingId(id);
    setEditingTask(task);
  };

  const handleSave = async (id) => {
    try {
      const updatedTodo = { task: editingTask };
      await axios.put(`http://localhost:4000/todos/${id}`, updatedTodo);
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, task: editingTask } : todo
      ));
      setEditingId(null);
      setEditingTask('');
    } catch (err) {
      console.error('Error saving todo:', err);
    }
  };

  const handleGenerateSummary = async () => {
    try {
      const res = await axios.post('http://localhost:4000/summarize', {
        tasks: todos.map(t => t.task),
      });
      setSummary(res.data.summary || 'Summary generated!');
    } catch (err) {
      console.error('Error generating summary:', err);
      setSummary('Failed to generate summary.');
    }
  };

  return (
    <div style={{
      maxWidth: '500px',
      margin: '50px auto',
      padding: '20px',
      fontFamily: 'Arial',
      border: '1px solid #ccc',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 style={{ textAlign: 'center' }}>📝 Todo Summary Assistant</h2>

      <div style={{ display: 'flex', marginBottom: '16px' }}>
        <input
          type="text"
          placeholder="New task..."
          value={task}
          onChange={e => setTask(e.target.value)}
          style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
        />
        <button
          onClick={handleAddTodo}
          style={{
            marginLeft: '8px',
            padding: '10px 16px',
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Add
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li key={todo.id} style={{
            background: '#f8f9fa',
            marginBottom: '10px',
            padding: '10px',
            borderRadius: '6px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            {editingId === todo.id ? (
              <input
                type="text"
                value={editingTask}
                onChange={e => setEditingTask(e.target.value)}
                style={{ flex: 1, padding: '6px', marginRight: '8px' }}
              />
            ) : (
              <span style={{ flex: 1 }}>{todo.task}</span>
            )}

            {editingId === todo.id ? (
              <button
                onClick={() => handleSave(todo.id)}
                style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  padding: '6px 10px',
                  borderRadius: '4px',
                  marginRight: '5px',
                  cursor: 'pointer'
                }}
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => handleEdit(todo.id, todo.task)}
                style={{
                  backgroundColor: '#ffc107',
                  color: 'black',
                  border: 'none',
                  padding: '6px 10px',
                  borderRadius: '4px',
                  marginRight: '5px',
                  cursor: 'pointer'
                }}
              >
                Edit
              </button>
            )}

            <button
              onClick={() => handleDelete(todo.id)}
              style={{
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                padding: '6px 10px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={handleGenerateSummary}
        style={{
          marginTop: '20px',
          padding: '10px 16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        ✨ Generate & Send Summary
      </button>

     {summary && (
  <div
    style={{
      marginTop: '20px',
      padding: '15px',
      backgroundColor: '#e6f4ea',
      border: '1px solid #c3e6cb',
      borderRadius: '8px',
      color: '#155724',
      whiteSpace: 'pre-wrap',
      lineHeight: '1.5',
    }}
  >
    <h4 style={{ marginBottom: '10px' }}>📋 Summary:</h4>
    <p style={{ margin: 0 }}>{summary}</p>
  </div>
)}

    </div>
  );
}

export default TodoList;

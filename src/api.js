import axios from 'axios';
const API = 'http://localhost:4000';

export const fetchTodos = () => axios.get(`${API}/todos`);
export const addTodo = (task) => axios.post(`${API}/todos`, { task });
export const deleteTodo = (id) => axios.delete(`${API}/todos/${id}`);
export const summarizeTodos = () => axios.post(`${API}/summarize`);

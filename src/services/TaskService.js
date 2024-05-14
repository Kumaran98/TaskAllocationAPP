import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/tasks';

const getAllTasks = () => axios.get(BASE_URL);
const createTask = (task) => axios.post(BASE_URL, task);
const updateTask = (id, task) => axios.put(`${BASE_URL}/${id}`, task);
const updateTaskStatus = (id, status) => axios.put(`${BASE_URL}/update-status/${id}`, { status });
const deleteTask = (id) => axios.delete(`${BASE_URL}/${id}`);

export default {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,  

};

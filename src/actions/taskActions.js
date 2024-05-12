import axios from 'axios'; // Import axios for making HTTP requests
import BASE_URL from './config'; // Import the base URL from the configuration file

// Action Types
export const FETCH_TASKS_REQUEST = 'FETCH_TASKS_REQUEST';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE';

export const CREATE_TASK_REQUEST = 'CREATE_TASK_REQUEST';
export const CREATE_TASK_SUCCESS = 'CREATE_TASK_SUCCESS';
export const CREATE_TASK_FAILURE = 'CREATE_TASK_FAILURE';

export const DELETE_TASK_REQUEST = 'DELETE_TASK_REQUEST';
export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS';
export const DELETE_TASK_FAILURE = 'DELETE_TASK_FAILURE';

export const UPDATE_TASK_REQUEST = 'UPDATE_TASK_REQUEST';
export const UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS';
export const UPDATE_TASK_FAILURE = 'UPDATE_TASK_FAILURE';

// Action Creators

// Fetch tasks action creators
export const fetchTasksRequest = () => ({
  type: FETCH_TASKS_REQUEST,
});

export const fetchTasksSuccess = tasks => ({
  type: FETCH_TASKS_SUCCESS,
  payload: tasks,
});

export const fetchTasksFailure = error => ({
  type: FETCH_TASKS_FAILURE,
  payload: error,
});

// Fetch tasks action creators
export const fetchTasks = () => {
  return dispatch => {
    dispatch(fetchTasksRequest());
    axios.get(`${BASE_URL}/task/get-all`)
      .then(response => {
        const tasks = response.data;
        dispatch(fetchTasksSuccess(tasks));
      })
      .catch(error => {
        const errorMessage = error.message;
        dispatch(fetchTasksFailure(errorMessage));
      });
  };
};

// Create task action creators
export const createTask = taskData => {
  return dispatch => {
    dispatch(createTaskRequest());
    axios.post(`${BASE_URL}/task`, taskData)
      .then(response => {
        const newTask = response.data;
        dispatch(createTaskSuccess(newTask));
      })
      .catch(error => {
        const errorMessage = error.message;
        dispatch(createTaskFailure(errorMessage));
      });
  };
};

// Delete task action creators
export const deleteTask = taskId => {
  return dispatch => {
    dispatch(deleteTaskRequest());
    axios.delete(`${BASE_URL}/task/delete/${taskId}`)
      .then(() => {
        dispatch(deleteTaskSuccess(taskId));
      })
      .catch(error => {
        const errorMessage = error.message;
        dispatch(deleteTaskFailure(errorMessage));
      });
  };
};

// Update task action creators
export const updateTask = (taskId, taskData) => {
  return dispatch => {
    dispatch(updateTaskRequest());
    axios.put(`${BASE_URL}/task/update/${taskId}`, taskData)
      .then(response => {
        const updatedTask = response.data;
        dispatch(updateTaskSuccess(updatedTask));
      })
      .catch(error => {
        const errorMessage = error.message;
        dispatch(updateTaskFailure(errorMessage));
      });
  };
};

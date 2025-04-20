import axios from "axios";
import { Todo } from "../interfaces/types";

const API_URL = "https://todobackend-5fod.onrender.com/tasks";

export const fetchTasks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const addTask = async (task: Todo) => {
  try {
    const response = await axios.post(API_URL, task);
    return response.data;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

export const updateTask = async (id: number, updatedTask: Todo) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedTask);
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

export const deleteTask = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

export const deleteAllTask = async () => {
  try {
    const response = await axios.delete(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

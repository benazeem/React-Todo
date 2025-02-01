import { Todo } from "../types";

export const saveTodosToLocalStorage = (todos: Todo[]) => {
  if (todos.length > 0) {
    try {
      localStorage.setItem("todos", JSON.stringify(todos));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error saving to localStorage:", error);
    }
  } else {
    try {
      localStorage.removeItem("todos");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error removing from localStorage:", error);
    }
  }
};

export const getTodosFromLocalStorage = (): Todo[] => {
  try {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error parsing localStorage:", error);
    return [];
  }
};

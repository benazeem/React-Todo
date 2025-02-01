import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Todo, TodoState } from "../types";
import {getTodosFromLocalStorage, saveTodosToLocalStorage} from "../service/localTodoStoreage";


const initialState: TodoState = {
  value: getTodosFromLocalStorage(),
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state: TodoState, action: PayloadAction<Todo>) => {
      state.value = [...state.value, action.payload];
      saveTodosToLocalStorage(state.value);
    },
    deleteTodo: (state: TodoState, action: PayloadAction<string>) => {
      state.value = state.value.filter((todo) => todo.id !== action.payload);
      saveTodosToLocalStorage(state.value);
    },
    toggleTodoComplete: (state: TodoState, action: PayloadAction<Todo>) => {
      state.value = state.value.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      saveTodosToLocalStorage(state.value);
    },
    clearCompletedTodos: (state: TodoState) => {
      state.value = state.value.filter((todo) => !todo.completed);
      saveTodosToLocalStorage(state.value);
    },
    setTodos: (state: TodoState, action: PayloadAction<Todo[]>) => {
      state.value = action.payload;
      saveTodosToLocalStorage(state.value);
    },
  },
});

export const {
  addTodo,
  deleteTodo,
  toggleTodoComplete,
  clearCompletedTodos,
  setTodos,
} = todoSlice.actions;
export default todoSlice.reducer;

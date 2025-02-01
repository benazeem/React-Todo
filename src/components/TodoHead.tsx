import React from 'react'
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from "uuid";
import { useTheme, useToggleThemeHandler } from "../hooks/useThemeToggle";
import { addTodo } from '../store/todoSlice';

function TodoHead() {

    const dispatch = useDispatch();
    const theme = useTheme();
    const toggleThemeHandler = useToggleThemeHandler();
    const handleKeyFunc = (e: React.KeyboardEvent<HTMLInputElement>) => {
      const todoMessage = e.currentTarget.value.trim();
        if (e.key === "Enter") {
          if (todoMessage === "") {
            alert("Please enter a todo");
            return;
          }
          const newTodo = { id: uuidv4(), todo: todoMessage, completed: false }
          dispatch(addTodo(newTodo));
          e.currentTarget.value = "";
        }
      };

  return (
    <>
    <header className="w-full md:w-4/5 lg:w-2/5">
            <div className=" text-4xl  flex font-bold justify-between">
              <h2 id="todo-list-title" className="tracking-widest text-white text-xl md:text-2xl lg:text-3xl">
                TODO
              </h2>
              <button onClick={toggleThemeHandler} aria-label="Toggle theme">
                <img
                  src={
                    theme === "dark"
                      ? "/images/icon-sun.svg"
                      : "/images/icon-moon.svg"
                  }
                  alt={theme === "dark" ? "sun icon" : "moon icon"}
                />
              </button>
            </div>
            <div className="mt-4 bg-white text-sm font-medium dark:bg-gray-800 p-2 flex gap-2 items-center rounded-md">
              <label htmlFor="input-head">
                <input
                  id="input-head"
                  type="checkbox"
                  className="hidden peer"
                  disabled
                />
                <span className="w-4 h-4 flex items-center justify-center rounded-full bg-transparent border border-gray-500"></span>
              </label>
              <input
                className="w-full focus:outline-none bg-white dark:bg-gray-800"
                type="text"
                onKeyDown={handleKeyFunc}
                placeholder="Create a new todo...."
                aria-label="Create a new todo"
              />
            </div>
          </header></>
  )
}

export default TodoHead
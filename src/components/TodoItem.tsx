import { useDispatch } from "react-redux";
import { useTheme} from "../hooks/useThemeToggle";
import {deleteTodo,toggleTodoComplete} from "../store/todoSlice"
import { Todo,TodoItemProps } from "../types";


function TodoItem(props:TodoItemProps) {
  const dispatch = useDispatch();
    const { todo, index, onDrop, setActiveCard, activeCard } = props;
    const theme = useTheme();

    const handleComplete = (item:Todo) => {
      dispatch(toggleTodoComplete(item));
     }
  
    const handleDelete = (id:string) => {
      dispatch(deleteTodo(id));
    }

  return (
    <>
    <li className={`w-[98%] group ${activeCard === todo.id ? 'active:text-blue-400' : ''}`} draggable aria-grabbed={activeCard === todo.id}>
              <div draggable
               onDragStart={()=>setActiveCard(todo.id)}
               onDragEnd={() => setActiveCard(null)}
               onDragOver={(e) => e.preventDefault()}
               onDrop={() => onDrop(index)}
              >
                <div className="bg-white text-sm dark:bg-gray-800 p-2 flex gap-2 items-center justify-between overflow-hidden w-full select-none ">
                  <label
                    htmlFor={`input-body-${index}`}
                    className="flex justify-stretch items-center gap-2 cursor-pointer w-[90%]"
                  >
                    <input
                      id={`input-body-${index}`}
                      type="checkbox"
                      className="hidden peer"
                      aria-checked={todo.completed}
                      checked={todo.completed}
                      onChange={() => handleComplete(todo)}
                    />
                    <span className="w-4 h-4 px-1 flex items-center justify-center rounded-full bg-transparent border border-gray-500 peer-checked:bg-gradient-to-r peer-checked:border-blue-400 peer-checked:from-blue-400 peer-checked:to-purple-500 peer-checked:text-white ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="11"
                        height="9"
                      >
                        <path
                          fill="none"
                          stroke={todo.completed?"#ffffff":"none"}
                          strokeWidth="2"
                          d="M1 4.304L3.696 7l6-6"
                        />
                      </svg>
                    </span>
                    <span className="font-medium px-2 w-[95%]  peer-checked:text-gray-400 peer-checked:line-through  break-normal break-words">
                     {todo.todo}
                    </span>
                  </label>
                  <button
                  type="button"
                    className="justify-center items-center hidden group-hover:flex"
                    onClick={() => handleDelete(todo.id)}
                    aria-label={`Delete todo: ${todo.todo}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                    >
                      <path
                        fill={theme==='dark'?"#ffffff":"#000"}
                        fillRule="evenodd"
                        d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </li>
            <div className="bg-gray-500 h-[1px] w-full"></div>
            </>
  )
}

export default TodoItem
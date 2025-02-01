import { useState, useMemo} from "react";
import { useSelector, useDispatch} from 'react-redux';
import { RootState } from "../store/store";
import EmptyState from "./EmptyState";
import TodoItem from "./TodoItem";
import TodoStatus from "./TodoStatus";
import TodoHead from './TodoHead'
import { clearCompletedTodos, setTodos } from "../store/todoSlice";
import useWindowWidth from "../hooks/useWindowWidth";


const Body = () => {
  const todos = useSelector((state: RootState) => state.todo.value);
  const windowWidth = useWindowWidth();
  const dispatch = useDispatch();
  const [show, setShow] = useState("all");
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const isSelected = (filter: string) =>
    show === filter ? "text-blue-600" : "";

  const handleClearComplete = () => {
    dispatch(clearCompletedTodos());
  };

  const onDrop = (filteredIndex: number) => {
    if (activeCard === null) return;

    const draggedTodoIndex = todos.findIndex((todo) => todo.id === activeCard);
    if (draggedTodoIndex === -1) return;

    const actualIndex = todos.findIndex(
      (todo) => todo.id === filteredTodos[filteredIndex]?.id
    );
    if (actualIndex === -1) return;

    const updatedTodos = [...todos];
    const [draggedTodo] = updatedTodos.splice(draggedTodoIndex, 1);
    updatedTodos.splice(actualIndex, 0, draggedTodo);

    dispatch(setTodos(updatedTodos));
    setActiveCard(null);
  };

  const filteredTodos = useMemo(() => {
    switch (show) {
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "complete":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [show, todos]);

  return (
    <>
      <div className="bg-gray-100 dark:bg-black text-gray-700 dark:text-gray-200  min-h-dvh">
        <div
          className=" w-full h-[200px] p-1 flex justify-center absolute items-center bg-cover bg-[url('/images/bg-mobile-light.jpg')] dark:bg-[url('/images/bg-mobile-dark.jpg')] lg:bg-[url('/images/bg-desktop-light.jpg')] lg:dark:bg-[url('/images/bg-desktop-dark.jpg')] "
        ></div>
        <div className="relative flex flex-col  items-center p-10">
        
        <TodoHead/>
        
          <div className="w-full md:w-4/5 lg:w-2/5 mt-6 rounded bg-white dark:bg-gray-800">
            <div aria-live="polite">
              {filteredTodos.length === 0 && <EmptyState filter={show} />}
              </div>
               <ul
              role="list"
              aria-labelledby="todo-list-title"
              className="w-full flex flex-col justify-center items-center"
            >
              {filteredTodos.map((todo, index) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  index={index}
                  onDrop={onDrop}
                  setActiveCard={setActiveCard}
                  activeCard={activeCard}
                />
              ))}
            </ul>
            <div className="w-full p-2 flex justify-between items-center font-medium text-gray-400 text-xs">
              <span>
                {todos.filter((todo) => todo.completed === false).length}
                {todos.filter((todo) => todo.completed === false).length > 1
                  ? " items "
                  : " item "}
                left
              </span>
              {windowWidth > 760 && (
                <TodoStatus isSelected={isSelected} setShow={setShow} />
              )}
              <button onClick={handleClearComplete}>Clear Completed</button>
            </div>
          </div>

          {windowWidth <= 760 && (
            <div className="w-full mt-4 rounded flex justify-center items-center bg-white dark:bg-gray-800 p-2 font-medium text-gray-400 text-xs">
              <TodoStatus isSelected={isSelected} setShow={setShow} />
            </div>
          )}
        </div>
        <div className="flex justify-center pb-8 text-gray-400 text-xs font-medium">
          Drag and drop to reorder list
        </div>
      </div>
    </>
  );
};

export default Body;

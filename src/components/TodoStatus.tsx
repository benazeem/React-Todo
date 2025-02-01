import { TodoStatusProps } from "../types";

function TodoStatus(props: TodoStatusProps) {
    const {isSelected, setShow} = props
  return (
   <>
               <div className="flex gap-2">
              <button
                type="button"
                className={isSelected("all")}
                onClick={() => setShow("all")}
              >
                All
              </button>
              <button className={isSelected("active")} onClick={() => setShow("active")}>
                Active
              </button>
              <button className={isSelected("complete")} onClick={() => setShow("complete")}>
                Completed
              </button>
            </div>
   </>
  )
}

export default TodoStatus
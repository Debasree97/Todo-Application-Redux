import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchTodos from "../redux/todos/thunk/fetchTodos";
import CompletedTodo from "./CompletedTodo";

export default function CompletedTodoList() {
  const todos = useSelector((state) => state.todos);
  const filters = useSelector((state) => state.filters);
  const dispatch = useDispatch();
 

  useEffect(() => {
    dispatch(fetchTodos);
  }, [dispatch]);

  const filterByStatus = (todo) => {
    const { status } = filters;
    switch (status) {
      case "Complete":
        return todo.completed;

      case "Incomplete":
        return !todo.completed;

      default:
        return true;
    }
  };

  const filterByColor = (todo) => {
    const { colors } = filters;
    if (colors.length > 0) {
      return colors.includes(todo?.color);
    } else {
      return true;
    }
  };

  const completedTask = todos.filter((todo) => todo.completed === true);

  return (
    <>
      <div>
        {completedTask.length > 0 ? (
          <h1 className="text-center mb-2">
            Number of Completed Task: {completedTask.length}
          </h1>
        ) : (
          <h1 className="text-center">No Completed Task!</h1>
        )}
      </div>

      <div
        className={`text-gray-700 text-sm max-h-[300px] overflow-y-auto ${
          completedTask.length > 0 ? "border-2" : "border-0"
        }`}
      >
        {todos &&
          todos
            .filter(filterByStatus)
            .filter(filterByColor)
            .map(
              (todo) =>
                todo.completed === true && (
                  <CompletedTodo todo={todo} key={todo.id} />
                )
            )}
      </div>
    </>
  );
}

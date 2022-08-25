import { useDispatch, useSelector } from "react-redux";
import { colorChanged, statusChanged } from "../redux/filters/actionCreators";

const noOfTodos = (no_of_todos) => {
  switch (no_of_todos) {
    case 0:
      return "No task";
    case 1:
      return "1 task";

    default:
      return `${no_of_todos} tasks`;
  }
};

export default function Footer() {
  const todos = useSelector((state) => state.todos);
  const filters = useSelector((state) => state.filters);

  const { status, colors } = filters;

  const dispatch = useDispatch();

  const statusChangeHandler = (status) => {
    dispatch(statusChanged(status));
  };

  const remainingTodos =
    todos && todos.filter((todo) => !todo.completed).length;

  const colorChangeHandler = (color) => {
    if (colors.includes(color)) {
      dispatch(colorChanged(color, "removed"));
    } else {
      dispatch(colorChanged(color, "added"));
    }
  };

  return (
    <div className="mt-4 flex justify-between text-xs text-gray-500">
      <p>{noOfTodos(remainingTodos)} left</p>
      <ul className="flex space-x-1 items-center text-xs">
        <li
          className={`cursor-pointer ${status === "All" && "font-bold"}`}
          onClick={() => {
            statusChangeHandler("All");
          }}
        >
          All
        </li>
        <li>|</li>
        <li
          className={`cursor-pointer ${status === "Incomplete" && "font-bold"}`}
          onClick={() => {
            statusChangeHandler("Incomplete");
          }}
        >
          Incomplete
        </li>
        <li>|</li>
        <li
          className={`cursor-pointer ${status === "Complete" && "font-bold"}`}
          onClick={() => {
            statusChangeHandler("Complete");
          }}
        >
          Complete
        </li>
        <li></li>
        <li></li>
        <li
          className={`h-3 w-3 border-2 border-green-500 md:hover:bg-green-500 rounded-full cursor-pointer ${
            colors.includes("green") && " bg-green-500"
          }`}
          onClick={() => {
            colorChangeHandler("green");
          }}
        ></li>
        <li
          className={`h-3 w-3 border-2 border-red-500 md:hover:bg-red-500 rounded-full cursor-pointer ${
            colors.includes("red") && " bg-red-500"
          }`}
          onClick={() => {
            colorChangeHandler("red");
          }}
        ></li>
        <li
          className={`h-3 w-3 border-2 border-yellow-500 md:hover:bg-yellow-500 rounded-full cursor-pointer ${
            colors.includes("yellow") && " bg-yellow-500"
          }`}
          onClick={() => {
            colorChangeHandler("yellow");
          }}
        ></li>
      </ul>
    </div>
  );
}

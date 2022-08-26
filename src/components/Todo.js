import cancelImage from "../assets/images/cancel.png";
import editImage from "../assets/images/edit.png";
import { useDispatch } from "react-redux";
import updateStatus from "../redux/todos/thunk/updateStatus";
import updateColor from "../redux/todos/thunk/updateColor";
import deleteTodo from "../redux/todos/thunk/deleteTodo";
import updatedText from "../redux/todos/thunk/updatedText";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
// import { updatedText } from "../redux/todos/actionCreators";

export default function Todo({ todo }) {
  const { text, id, completed, color } = todo;
  const dispatch = useDispatch();
  // const [modalIsOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [search, setSearch] = useState(text);

  const statusChangeHandler = (todoId) => {
    dispatch(updateStatus(todoId, completed));
  };

  const colorChangeHandler = (todoId, color) => {
    dispatch(updateColor(todoId, color));
  };

  const deleteHandler = (todoId) => {
    dispatch(deleteTodo(todoId));
  };

  const formVisible = (value) => {
    setIsEdit(value);
  };

  // debounce

  const updateTextField = (search, id) => {
    dispatch(updatedText(search, id));
  };

  const updateSearch = (id) => {
    updateTextField(search, id);
    setIsEdit(false);
  };

  const delayedSearch = useCallback(debounce(updateTextField, 500), [search]);

  const onChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  useEffect(() => {
    delayedSearch();
    return delayedSearch.cancel;
  }, [search, delayedSearch]);

  

  return (
    <div className="flex justify-start items-center p-2 hover:bg-gray-100 hover:transition-all space-x-4 border-b border-gray-400/20 last:border-0">
      <div
        className={`relative rounded-full bg-white border-2 border-gray-400 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 ${
          completed && "border-green-500 focus-within:border-green-500"
        }`}
      >
        <input
          type="checkbox"
          checked={completed}
          onChange={() => {
            statusChangeHandler(id);
          }}
          className="opacity-0 absolute rounded-full"
        />
        {completed && (
          <svg
            className=" fill-current w-3 h-3 text-green-500 pointer-events-none"
            viewBox="0 0 20 20"
          >
            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
          </svg>
        )}
      </div>

      {isEdit ? (
        <form className="select-none flex-1">
          <input
            value={search}
            onChange={onChange}
            type="text"
            className="border-2 p-1"
          />
          <button
            className="border-2 p-1 bg-green-400"
            onClick={() => {
              updateSearch(id);
            }}
          >
            Submit
          </button>
        </form>
      ) : (
        <div className="select-none flex-1">{text}</div>
      )}

      <div
        onClick={() => {
          colorChangeHandler(id, "green");
        }}
        className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-green-500 border-green-500 ${
          color === "green" && "bg-green-500"
        }`}
      ></div>

      <div
        onClick={() => {
          colorChangeHandler(id, "yellow");
        }}
        className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-yellow-500 border-yellow-500  ${
          color === "yellow" && "bg-yellow-500"
        }`}
      ></div>

      <div
        className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-red-500 border-red-500 ${
          color === "red" && "bg-red-500"
        }`}
        onClick={() => {
          colorChangeHandler(id, "red");
        }}
      ></div>

      <img
        onClick={() => {
          formVisible(true);
        }}
        src={editImage}
        className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer"
        alt="Edit"
      />

      <img
        onClick={() => {
          deleteHandler(id);
        }}
        src={cancelImage}
        className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer"
        alt="Cancel"
      />
    </div>
  );
}

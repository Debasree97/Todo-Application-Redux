import { updateText } from "../actionCreators";

const updatedText = ( texts,todoId) => {
  return async (dispatch) => {
    const response = await fetch(`http://localhost:9000/todos/${todoId}`, {
      method: "PATCH",
      body: JSON.stringify({
        text: texts,
      }),
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
    });
    const todo = await response.json();

    dispatch(updateText(todo.id, todo.text));
  };
};

export default updatedText;

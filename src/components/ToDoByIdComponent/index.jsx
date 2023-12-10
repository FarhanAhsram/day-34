import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading";
import ErrorComponent from "../Error";
import { fetchToDoById } from "../../reducer/todoDynamicSlice";

const ToDoComponentById = () => {
  const dispatch = useDispatch();
  //untuk data
  const todo = useSelector((state) => state.todosById.todo);
  //untuk status (loading, success, failed)
  const status = useSelector((state) => state.todosById.status);
  //untuk error
  const error = useSelector((state) => state.todosById.error);

  //state untuk menyimpan value input
  const [input, setInput] = useState();
  //trigger untuk meng-fetch data menggunakan id berdasarkan inputan
  const handleFetchClick = () => {
    //jika input ada value
    if (input) {
      //dispatch fetchToDo dengan param input
      dispatch(fetchToDoById(input));
    }
  };

  console.log("todo by id", todo);
  console.log("status by id", status);
  console.log("error by id", error);

  //early return untuk loading
  if (status === "loading") return <Loading />;

  //early return untuk error
  if (status === "failed") return <ErrorComponent message={error} />;

  return (
    <div className="mt-8 mx-auto">
      {/* input ToDo by id */}
      <div className="bg-white p-8 max-w-xs w-full rounded-lg">
        <input
          type="number"
          placeholder="Enter To Do Id"
          className="border border-gray-400 p-2 rounded-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="bg-blue-300 p-2 w-full mt-4 rounded-md"
          onClick={handleFetchClick}
        >
          Fetch To Do
        </button>
      </div>

      {/* return untuk success */}
      {status === "succeeded" && (
        <div key={todo.id}>
          <h3 className="font-bold text-3x1 text-blue-400">{todo.title}</h3>
          <p
            className={`font-semibold text-lg ${
              todo.completed ? "text-green-600" : "text-red-500"
            }`}
          >
            Completed : {todo.completed ? "Yes" : "No"}
          </p>
        </div>
      )}
    </div>
  );
};

export default ToDoComponentById;

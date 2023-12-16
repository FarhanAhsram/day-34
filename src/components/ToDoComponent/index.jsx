import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchToDo } from "../../reducer/todosSlice";
import Loading from "../Loading";
import ErrorComponent from "../Error";

const ToDoComponent = () => {
  const dispatch = useDispatch();
  //untuk data
  const todo = useSelector((state) => state.todos.todo);
  //untuk status (loading, success, failed)
  const status = useSelector((state) => state.todos.status);
  //untuk error
  const error = useSelector((state) => state.todos.error);

  //memanggil function langsung tanpa menggunakan trigger (button)
  useEffect(() => {
    dispatch(fetchToDo());
  }, [dispatch]);

  //pengecekan code & API berjalan atau tidak
  console.log("todo", todo);
  console.log("status", status);
  console.log("error", error);

  //early return untuk loading
  if (status === "loading") return <Loading />;

  //early return untuk error
  if (status === "failed") return <ErrorComponent message={error} />;

  return (
    <div className="mt-8 mx-auto">
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

export default ToDoComponent;

import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../reducer/counterSlice";
import modalReducer from "../reducer/modalSlice";
import todosReducer from "../reducer/todosSlice";
import todosByIdReducer from "../reducer/todoDynamicSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    modal: modalReducer,
    todos: todosReducer,
    todosById: todosByIdReducer,
  },
});

import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../reducer/counterSlice";
import modalReducer from "../reducer/modalSlice";
import todosReducer from "../reducer/todosSlice";
import todosByIdReducer from "../reducer/todoDynamicSlice";
import registerReducer from "../reducer/registerSlice";

//function middleware untuk menyimpan token register
const saveTokenMiddleware = () => (next) => (action, state) => {
  //response berhasil
  if (action.type === "register/registerUser/fulfilled") {
    const response = action.payload;
    const token = response?.token;

    console.log("Middleware Response", response);
    console.log("Middleware Token", token);
    //save token to local storage
    localStorage.setItem("Token", token);

    //Redirect ke halaman yang ingin dituju isi disini
  }
  if (action.type === "register/registerUser/fulfilled") {
    const response = action.payload;
    const id = response?.id;

    if (id !== 4) {
      console.log("Unauthorized User");
      state.status = "Unauthorized";
    }
  }

  next(action);
};

export const store = configureStore({
  reducer: {
    // (nama "name" pada slice) : (nama reducer)
    counter: counterReducer,
    modal: modalReducer,
    todos: todosReducer,
    todosById: todosByIdReducer,
    register: registerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(saveTokenMiddleware),
});

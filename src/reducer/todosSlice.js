import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//fetching data
export const fetchToDo = createAsyncThunk("todos/fetchToDo", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const data = await response.json();
  return data;
});

//buat slice/reducers
const todosSlice = createSlice({
  //nama state
  name: "todos",
  initialState: {
    //state data todos
    todo: {},
    status: "idle",
    error: null,
  },
  //reducer
  reducers: {},
  extraReducers: (builder) => {
    builder
      //untuk loading, simpan ke state 'status'
      .addCase(fetchToDo.pending, (state) => {
        state.status = "loading";
      })
      //untuk success, simpan ke state 'status'
      //untuk data, simpan ke state 'todo'
      .addCase(fetchToDo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todo = action.payload;
      })
      //untuk failed, simpan ke state 'status'
      //untuk error, simpan ke state 'error'
      .addCase(fetchToDo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default todosSlice.reducer;

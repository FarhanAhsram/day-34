import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//fetching data
export const fetchToDoById = createAsyncThunk(
  'todos/fetchTodoById',
  async (todoId) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${todoId}`
    );
    const data = await response.json();
    return data;
  }
);

//buat slice/reducers
const todosByIdSlice = createSlice({
  //nama state
  name: "todosById",
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
      .addCase(fetchToDoById.pending, (state) => {
        state.status = "loading";
      })
      //untuk success, simpan ke state 'status'
      //untuk data, simpan ke state 'todo'
      .addCase(fetchToDoById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todo = action.payload;
      })
      //untuk failed, simpan ke state 'status'
      //untuk error, simpan ke state 'error'
      .addCase(fetchToDoById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default todosByIdSlice.reducer;

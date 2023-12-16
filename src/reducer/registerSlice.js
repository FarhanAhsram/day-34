import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//representasi function untuk apa
export const fetchRegisterUser = createAsyncThunk(
  "register/registerUser",
  async (userData) => {
    //try catch untuk check function benar / salah
    try {
      const response = await fetch("https://reqres.in/api/register", {
        //method based on API = DELETE, PUT, POST, PATCH
        method: "POST",
        //headers => content apa? "application/json"
        headers: {
          "Content-Type": "application/json",
        },
        //body => isi body sesuai API, biasanya JSON string
        body: JSON.stringify(userData),
      });
      //check response
      if (!response.ok) {
        //respon gagal
        throw new Error("Login Gagal");
      }
      //respon berhasil
      console.log("Login Berhasil");
      const data = await response.json();
      return data;
    } catch (error) {
      //Error Handle
      console.log("Error pada try catch", error);
      throw error;
    }
  }
);

//slice
const registerSlice = createSlice({
  name: "register",
  initialState: {
    response: null,
    status: "idle",
    error: null,
  },
  //reducers => handle synchronus
  reducers: {},
  //extrareducers => handle asynchronus
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegisterUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRegisterUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload;
      })
      .addCase(fetchRegisterUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default registerSlice.reducer;

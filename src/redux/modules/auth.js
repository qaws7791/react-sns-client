import { getAccessToken, joinUser, loginUser, logoutUser } from "@/api/user";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const TOKEN_EXPIRATION = 1000 * 60 * 60; // 1hr

const initialState = {
  token: "",
  userId: "",
  email: "",
  expiration: "",
  isLogged: false,
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export const __join = createAsyncThunk(
  "JOIN_USER",
  async (payload, thunkAPI) => {
    try {
      const userData = await joinUser(payload);
      const expiration = new Date(
        new Date().getTime() + TOKEN_EXPIRATION
      ).toISOString();
      localStorage.setItem(
        "userData",
        JSON.stringify({ ...userData, expiration })
      );
      return thunkAPI.fulfillWithValue({ ...userData, expiration });
    } catch (error) {
      if (error?.response) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const __login = createAsyncThunk(
//   "LOGIN_USER",
//   async (payload, thunkAPI) => {
//     try {
//       const userData = payload;
//       const expiration = new Date(
//         new Date().getTime() + TOKEN_EXPIRATION
//       ).toISOString();
//       localStorage.setItem(
//         "userData",
//         JSON.stringify({ ...userData, expiration })
//       );
//       return thunkAPI.fulfillWithValue({ ...userData, expiration });
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

export const __login = createAsyncThunk(
  "LOGIN_USER",
  async (payload, thunkAPI) => {
    let userData;
    try {
      userData = await loginUser(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }

    try {
      const expiration = new Date(
        new Date().getTime() + TOKEN_EXPIRATION
      ).toISOString();
      localStorage.setItem(
        "userData",
        JSON.stringify({ ...userData, expiration })
      );
      return thunkAPI.fulfillWithValue({ ...userData, expiration });
    } catch (error) {
      return thunkAPI.rejectWithValue("토큰 저장 실패");
    }
  }
);

export const __logout = createAsyncThunk(
  "LOGOUT_USER",
  async (payload, thunkAPI) => {
    try {
      await logoutUser();
      localStorage.removeItem("userData");
      return thunkAPI.fulfillWithValue();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __autoLogin = createAsyncThunk(
  "LOAD_USER",
  async (payload, thunkAPI) => {
    // 리프레시 토큰으로 토큰 재발급
    try {
      const data = await getAccessToken();
      const expiration = new Date(
        new Date().getTime() + TOKEN_EXPIRATION
      ).toISOString();
      localStorage.setItem("userData", JSON.stringify({ ...data, expiration }));
      return thunkAPI.fulfillWithValue({ ...data, expiration });
    } catch (error) {
      if (error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const __refreshAccessToken = createAsyncThunk(
//   "LOAD_USER",
//   async (payload, thunkAPI) => {
//     // 리프레시 토큰으로 토큰 재발급
//     try {
//       const data = await getAccessToken();
//       if (data?.accessToken) {
//         const expiration = new Date(
//           new Date().getTime() + TOKEN_EXPIRATION
//         ).toISOString();
//         localStorage.setItem(
//           "userData",
//           JSON.stringify({ ...data, expiration })
//         );
//         return thunkAPI.fulfillWithValue({ ...data, expiration });
//       } else {
//         return thunkAPI.rejectWithValue();
//       }
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state, action) => {
      state.isError = false;
      state.errorMessage = "";
    },
  },
  extraReducers: {
    [__join.pending]: (state, action) => {
      state.token = "";
      state.userId = "";
      state.email = "";
      state.expiration = "";
      state.isLogged = false;
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = "";
    },
    [__join.fulfilled]: (state, action) => {
      state.token = action.payload.accessToken;
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.expiration = action.payload.expiration;
      state.isLogged = true;
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = "";
    },
    [__join.rejected]: (state, action) => {
      state.token = "";
      state.userId = "";
      state.email = "";
      state.expiration = "";
      state.isLogged = false;
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },

    [__login.pending]: (state, action) => {
      state.token = "";
      state.userId = "";
      state.email = "";
      state.expiration = "";
      state.isLogged = false;
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = "";
    },
    [__login.fulfilled]: (state, action) => {
      state.token = action.payload.accessToken;
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.expiration = action.payload.expiration;
      state.isLogged = true;
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = "";
    },
    [__login.rejected]: (state, action) => {
      state.token = "";
      state.userId = "";
      state.email = "";
      state.expiration = "";
      state.isLogged = false;
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },
    [__logout.fulfilled]: (state, action) => {
      state.token = "";
      state.userId = "";
      state.email = "";
      state.expiration = "";
      state.isLogged = false;
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = "";
    },
    [__autoLogin.pending]: (state, action) => {
      state.token = "";
      state.userId = "";
      state.email = "";
      state.expiration = "";
      state.isLogged = false;
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = "";
    },
    [__autoLogin.fulfilled]: (state, action) => {
      state.token = action.payload.accessToken;
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.expiration = action.payload.expiration;
      state.isLogged = true;
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = "";
    },
    [__autoLogin.rejected]: (state, action) => {
      state.token = "";
      state.userId = "";
      state.email = "";
      state.expiration = "";
      state.isLogged = false;
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;

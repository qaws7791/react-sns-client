import { getAccessToken, joinUser, loginUser, logoutUser } from "@/api/user";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const TOKEN_EXPIRATION = 1000 * 60 * 60; // 1hr

const initialState = {
  token: "",
  userId: "",
  email: "",
  isLogged: false,
  isLoading: true,
  isError: false,
  error: null,
  expiration: null,
};

export const __join = createAsyncThunk(
  "JOIN_USER",
  async (payload, thunkAPI) => {
    try {
      const data = await joinUser(payload);
      const expiration = new Date(
        new Date().getTime() + TOKEN_EXPIRATION
      ).toISOString();
      localStorage.setItem("userData", JSON.stringify({ ...data, expiration }));
      return thunkAPI.fulfillWithValue({ ...data, expiration });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __login = createAsyncThunk(
  "LOGIN_USER",
  async (payload, thunkAPI) => {
    try {
      const data = await loginUser(payload);
      const expiration = new Date(
        new Date().getTime() + TOKEN_EXPIRATION
      ).toISOString();
      localStorage.setItem("userData", JSON.stringify({ ...data, expiration }));
      return thunkAPI.fulfillWithValue({ ...data, expiration });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
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

export const __loadUser = createAsyncThunk(
  "LOAD_USER",
  async (payload, thunkAPI) => {
    // localStorage 사용
    try {
      const storedData = JSON.parse(localStorage.getItem("userData"));
      if (
        storedData?.accessToken &&
        new Date(storedData.expiration) > new Date()
      )
        return thunkAPI.fulfillWithValue(storedData);
    } catch (error) {
      console.log(error);
    }

    // 리프레시 토큰으로 토큰 재발급
    try {
      const data = await getAccessToken();
      if (data?.accessToken) {
        const expiration = new Date(
          new Date().getTime() + TOKEN_EXPIRATION
        ).toISOString();
        localStorage.setItem(
          "userData",
          JSON.stringify({ ...data, expiration })
        );
        return thunkAPI.fulfillWithValue({ ...data, expiration });
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
    return thunkAPI.rejectWithValue();
  }
);

export const __refreshAccessToken = createAsyncThunk(
  "LOAD_USER",
  async (payload, thunkAPI) => {
    // 리프레시 토큰으로 토큰 재발급
    try {
      const data = await getAccessToken();
      if (data?.accessToken) {
        const expiration = new Date(
          new Date().getTime() + TOKEN_EXPIRATION
        ).toISOString();
        localStorage.setItem(
          "userData",
          JSON.stringify({ ...data, expiration })
        );
        return thunkAPI.fulfillWithValue({ ...data, expiration });
      } else {
        return thunkAPI.rejectWithValue();
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [__join.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__join.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isLogged = true;
      state.token = action.payload.accessToken;
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.expiration = action.payload.expiration;
    },
    [__join.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isLogged = false;
      state.error = action.payload;
    },

    [__login.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__login.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isLogged = true;
      state.token = action.payload.accessToken;
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.expiration = action.payload.expiration;
    },
    [__login.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isLogged = false;
      state.error = action.payload;
    },
    [__logout.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isLogged = false;
      state.token = "";
      state.userId = "";
      state.email = "";
      state.expiration = null;
    },
    [__loadUser.pending]: (state, action) => {
      state.isLoading = true;
      state.isLogged = false;
      state.isError = false;
    },
    [__loadUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isLogged = true;
      state.token = action.payload.accessToken;
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.expiration = action.payload.expiration;
    },
    [__loadUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isLogged = false;
      state.isError = true;
      state.error = action.payload;
    },
    [__refreshAccessToken.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__refreshAccessToken.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isLogged = true;
      state.token = action.payload.accessToken;
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.expiration = action.payload.expiration;
    },
    [__refreshAccessToken.rejected]: (state, action) => {
      state.isLoading = false;
      state.isLogged = false;
      state.isError = true;
      state.error = action.payload;
      state.token = "";
      state.userId = "";
      state.email = "";
      state.expiration = null;
    },
  },
});

export default authSlice.reducer;

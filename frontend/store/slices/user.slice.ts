import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type User = {
  id?: String;
  email: String;
  fullName: String;
};

interface IUser {
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: IUser = {
  user: null,
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setLogout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { setUser, setLogout } = userSlice.actions;

export default userSlice.reducer;

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
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;

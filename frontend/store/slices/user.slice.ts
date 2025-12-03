import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type SocialLinks = {
  linkedin?: string;
  github?: string;
  porfolio?: string;
};

export type User = {
  id?: string;
  fullName: string;
  email: string;
  mobile?: string;
  city?: string;
  state?: string;
  country?: string;
  summary?: string;
  gridOrTable: boolean;
  socialLinks?: SocialLinks;
  skills?: string[];
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
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    gridOrTable: (state, action: PayloadAction<boolean>) => {
      state.user.gridOrTable = action.payload;
    },
  },
});

export const { setUser, setLogout, updateUser, gridOrTable } =
  userSlice.actions;

export default userSlice.reducer;

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
  agentMode: boolean;
}

const initialState: IUser = {
  user: null,
  isAuthenticated: false,
  agentMode: false,
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
      if (state.user) {
        state.user.gridOrTable = action.payload;
      }
    },
    setAgenMode: (state) => {
      state.agentMode = !state.agentMode;
    },
  },
});

export const { setUser, setLogout, updateUser, gridOrTable, setAgenMode } =
  userSlice.actions;

export default userSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/user";

type state = {
	isAuthorized: boolean;
	user?: User;
};

const initialState: state = {
	isAuthorized: false,
	user: undefined,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setIsAuthorized: (state, action: PayloadAction<boolean>) => {
			if (action.payload === false) {
				state.user = undefined;
			}
			state.isAuthorized = action.payload;
		},
		setUser: (state, action: PayloadAction<User | undefined>) => {
			state.user = action.payload;
		},
	},
	selectors: {
		getIsAuthorized: (state) => state.isAuthorized,
		getUser: (state) => state.user,
	},
});

export const { selectors: authSelectors, actions: authActions } = authSlice;

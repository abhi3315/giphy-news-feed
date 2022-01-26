import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
	name: "user",
	initialState: {
		details: null,
	},
	reducers: {
		setUser: (state, action) => {
			state.details = action.payload;
		},
		removeUser: (state) => {
			state.details = null;
		},
	},
});

export const { setUser, removeUser } = user.actions;

export default user.reducer;

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import postReducer from "./post";

export default configureStore({
	reducer: {
		user: userReducer,
		post: postReducer,
	},
});

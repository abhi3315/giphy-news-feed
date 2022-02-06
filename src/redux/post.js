import { createSlice } from "@reduxjs/toolkit";

export const post = createSlice({
	name: "post",
	initialState: {
		posts: [],
	},
	reducers: {
		prependPost: (state, action) => {
			state.posts = [{ ...action.payload }, ...state.posts];
			localStorage.setItem("posts", JSON.stringify(state.posts));
		},
		getPosts: (state) => {
			const posts = JSON.parse(localStorage.getItem("posts")) || [];
			state.posts = posts;
		},
		removePosts: (state) => {
			state.posts = [];
			localStorage.removeItem("posts");
		},
	},
});

export const { prependPost, getPosts, removePosts } = post.actions;

export default post.reducer;

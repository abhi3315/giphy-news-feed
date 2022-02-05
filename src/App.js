import React from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Spin, message } from "antd";
import { setUser, removeUser } from "./redux/user";
import { getPosts } from "./redux/post";
import Login from "./components/Login";
import Header from "./components/Header";
import ListPosts from "./components/ListPosts";
import "antd/dist/antd.css";
import "./App.css";

function App() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [loading, setLoading] = React.useState(true);

	React.useEffect(() => {
		setLoading(true);
		(async () => {
			try {
				dispatch(getPosts());
				const serverBaseRoute = process.env.REACT_APP_SERVER_ROUTE;
				const authToken = localStorage.getItem("authToken");

				if (!authToken) return setLoading(false);

				const res = await fetch(`${serverBaseRoute}/verify/${authToken}`);

				if (!res.ok) throw new Error("Unable to verify token");

				const data = await res.json();
				dispatch(setUser(data.payload));
				navigate("/");
			} catch (e) {
				message.warning({ content: "Session expired. Please login again." });
				navigate("/login", { replace: true });
				dispatch(removeUser());
			}
			setLoading(false);
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return !loading ? (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<ListPosts />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</>
	) : (
		<div className="loader-container">
			<Spin size="large" />
		</div>
	);
}

export default App;

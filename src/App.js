import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Spin, message } from "antd";
import { removeUser } from "./redux/user";
import { getPosts, removePosts } from "./redux/post";
import Login from "./components/Login";
import Header from "./components/Header";
import ListPosts from "./components/ListPosts";
import "antd/dist/antd.css";

function App() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const user = useSelector((state) => state.user?.details);

	const [loading, setLoading] = React.useState(true);

	React.useEffect(() => {
		setLoading(true);
		(async () => {
			try {
				if (!user) throw new Error("User details not available.");
				dispatch(getPosts());
				navigate("/");
			} catch (e) {
				message.warning({ content: "Session expired. Please login again." });
				navigate("/login", { replace: true });
				dispatch(removePosts());
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

import React from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { setUser, removeUser } from "./redux/user";
import Login from "./components/Login";
import Header from "./components/Header";
import "antd/dist/antd.css";
import "./App.css";

function App() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [loading, setLoading] = React.useState(false);

	React.useEffect(() => {
		setLoading(true);
		(async () => {
			try {
				const serverBaseRoute = process.env.REACT_APP_SERVER_ROUTE;
				const authToken = localStorage.getItem("authToken");

				if (!authToken) throw new Error();

				const res = await fetch(`${serverBaseRoute}/verify/${authToken}`);

				if (!res.ok) throw new Error("Unable to verify token");

				const data = await res.json();
				dispatch(setUser({ payload: data }));
				navigate("/");
			} catch (e) {
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
				<Route path="/" element={<p>aaa</p>} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</>
	) : (
		<Spin size="large" />
	);
}

export default App;

import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import AuthRouter from "./components/AuthRouter";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Header from "./components/Header";
import store from "./redux/store";
import "antd/dist/antd.css";
import "./App.css";

function App() {
	return (
		<Provider store={store}>
			<Header />
			<Router>
				<Routes>
					<Route path="/login" element={<Login />} />
				</Routes>
			</Router>
		</Provider>
	);
}

export default App;

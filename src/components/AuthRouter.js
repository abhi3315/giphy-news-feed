// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { setUser, removeUser } from "../redux/user";
// import { Route, useNavigate } from "react-router-dom";

// const AuthRouter = ({ path, child }) => {
// 	const navigate = useNavigate();
// 	const dispatch = useDispatch();
// 	const user = useSelector((state) => state.user);

// 	React.useEffect(
// 		() =>
// 			(async () => {
// 				try {
// 					if (!user) return navigate("/login");

// 					const serverBaseRoute = process.env.REACT_APP_SERVER_ROUTE;
// 					const authToken = localStorage.getItem("authToken");
// 					const res = fetch(`${serverBaseRoute}/verify/${authToken}`);

// 					if (!res.ok) throw new Error("Unable to verify token");

// 					const data = res.json();

// 					dispatch(setUser({ payload: data }));

// 					navigate("/");
// 				} catch (e) {
// 					dispatch(removeUser());
// 					navigate("/login");
// 				}
// 			})(),
// 		[dispatch, navigate, user]
// 	);

// 	return (
// 		<Route path={path}>
// 			<child />
// 		</Route>
// 	);
// };

// export default AuthRouter;

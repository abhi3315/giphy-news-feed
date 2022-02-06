import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Tooltip, message } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useGoogleLogout } from "react-google-login";
import { removeUser } from "../redux/user";
import { removePosts } from "../redux/post";

const clientId = process.env.REACT_APP_CLIENT_ID;

const Logout = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onLogoutSuccess = (res) => {
		message.success({ content: "Logged out successfully!" });
		localStorage.removeItem("authToken");
		dispatch(removePosts());
		dispatch(removeUser());
		navigate("/login");
	};

	const onFailure = () => {
		message.success({ content: "Unable to logout. Please try again later!" });
	};

	const { signOut } = useGoogleLogout({
		clientId,
		onLogoutSuccess,
		onFailure,
	});

	return (
		<Tooltip placement="bottom" title="Logout">
			<Button
				type="primary"
				shape="circle"
				onClick={signOut}
				icon={<LogoutOutlined />}
			/>
		</Tooltip>
	);
};

export default Logout;

import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Row, Col, Alert } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { useGoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { removePosts } from "../redux/post";
import { setUser, removeUser } from "../redux/user";
import { refreshTokenSetup } from "../utils/auth";

const clientId = process.env.REACT_APP_CLIENT_ID;

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [error, setError] = React.useState("");

	const onSuccess = (res) => {
		setError("");
		localStorage.setItem("authToken", res.tokenObj.id_token);
		dispatch(setUser(res.profileObj));
		refreshTokenSetup(res);
		navigate("/");
	};

	const onFailure = (res) => {
		setError(res?.details || "Unable to login. Try again later!");
		dispatch(removePosts());
		dispatch(removeUser());
	};

	const { signIn } = useGoogleLogin({
		onSuccess,
		onFailure,
		clientId,
		accessType: "offline",
	});

	return (
		<Row align="bottom" justify="center" className="h-50vh">
			<Col>
				<Button
					onClick={signIn}
					type="primary"
					size="large"
					className="login-btn"
					icon={<GoogleOutlined />}
				>
					Sign in with Google
				</Button>
				{error && <Alert type="warning" message={error} banner closable />}
			</Col>
		</Row>
	);
};

export default Login;

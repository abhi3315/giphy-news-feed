import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Row, Col } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { useGoogleLogin } from "react-google-login";
import { useSelector, useDispatch } from "react-redux";
import { setUser, removeUser } from "../redux/user";
import { refreshTokenSetup } from "../utils/auth";

const clientId = process.env.REACT_APP_CLIENT_ID;

function Login() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state.user);

	const onSuccess = (res) => {
		localStorage.setItem("authToken", res.tokenObj.id_token);
		dispatch(setUser(res.profileObj));
		refreshTokenSetup(res);
	};

	const onFailure = (res) => {
		console.log("Login failed: res:", res);
		alert(
			`Failed to login. 😢 Please ping this to repo owner twitter.com/sivanesh_fiz`
		);
	};

	const { signIn } = useGoogleLogin({
		onSuccess,
		onFailure,
		clientId,
		isSignedIn: true,
		accessType: "offline",
	});

	React.useEffect(() => {
		console.log(user);
	}, [user]);

	if (user.details) navigate("/");
	return (
		<Row align="bottom" justify="center" className="h-50vh">
			<Col>
				<Button
					onClick={signIn}
					type="primary"
					size="large"
					icon={<GoogleOutlined />}
				>
					Sign in with Google
				</Button>
			</Col>
		</Row>
	);
}

export default Login;

import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { Row, Col, Typography, Tooltip, Button } from "antd";
import { ShareAltOutlined } from "@ant-design/icons";
import NewPost from "./NewPost";
import Logout from "./Logout";

const { Title } = Typography;

const Header = () => {
	const userDetails = useSelector((state) => state.user?.details);

	const [showModel, setShowModel] = React.useState(false);

	const toggleModel = () => setShowModel(!showModel);

	return (
		<div className="header">
			<Row align="middle">
				<Col span={18}>
					<Title level={3}>
						{userDetails?.givenName
							? `Welcome ${userDetails.givenName}!`
							: "Express Your Thoughts"}
					</Title>
				</Col>
				<Routes>
					<Route
						path="/"
						element={
							<Col span={6} className="nav-btn-container">
								<Tooltip
									placement="bottom"
									title="Share your thoughts!"
									className="mr-10"
								>
									<Button
										type="primary"
										shape="circle"
										onClick={toggleModel}
										icon={<ShareAltOutlined />}
									/>
								</Tooltip>
								<Logout />
							</Col>
						}
					/>
				</Routes>
			</Row>
			<NewPost isOpen={showModel} toggleModel={toggleModel} />
		</div>
	);
};

export default Header;

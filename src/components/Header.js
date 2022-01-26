import React from "react";
import { Routes, Route } from "react-router-dom";
import { Row, Col, Typography } from "antd";
import Logout from "./Logout";

const Header = () => {
	const { Title } = Typography;
	return (
		<div className="header">
			<Row align="middle">
				<Col span={18}>
					<Title level={3}>Express Your Thoughts</Title>
				</Col>
				<Routes>
					<Route
						path="/"
						element={
							<Col span={6} className="nav-btn-container">
								<Logout />
							</Col>
						}
					/>
				</Routes>
			</Row>
		</div>
	);
};

export default Header;

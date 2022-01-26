import React from "react";
import { Row, Col, Typography } from "antd";

const Header = () => {
	const { Title } = Typography;
	return (
		<div className="header">
			<Row align="middle">
				<Col span={18}>
					<Title level={3}>Express Your Thoughts</Title>
				</Col>
				<Col span={6}>col</Col>
			</Row>
		</div>
	);
};

export default Header;

import React from "react";
import { Radio, Input, Row, Col, Button } from "antd";

const Giphy = ({ gifs }) => {
	return (
		<>
			<Radio.Group optionType="button" buttonStyle="solid">
				<Row gutter={16} className="gif-container mb-10">
					{gifs.map(({ id }) => (
						<Col key={id} className="gutter-row" span={12}>
							<Radio.Button value={id} className="mb-10 img-label">
								<img
									src={`https://i.giphy.com/media/${id}/100.webp`}
									alt="gif"
									height="100"
									width="100"
								/>
							</Radio.Button>
						</Col>
					))}
				</Row>
				<Row gutter={16} className="w-300px">
					<Col span={18}>
						<Input placeholder="Search Gifs" />
					</Col>
					<Col span={6}>
						<Button className="width100">Select GIF</Button>
					</Col>
				</Row>
			</Radio.Group>
		</>
	);
};

export default Giphy;

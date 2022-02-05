import React from "react";
import { Modal, Input, Popover, Button } from "antd";
import Giphy from "./Giphy";

const NewPost = ({ toggleModel, isOpen }) => {
	const { TextArea } = Input;

	return (
		<Modal
			title="Giphyfy Your Thoughts!"
			style={{ top: 20 }}
			visible={isOpen}
			onOk={toggleModel}
			onCancel={toggleModel}
			footer={[
				<Popover
					placement="bottom"
					title="Select Gif"
					trigger="click"
					key="gif"
					content={<Giphy />}
				>
					<Button>Select Gif</Button>
				</Popover>,
				<Button key="submit" type="primary">
					Add Post
				</Button>,
			]}
		>
			<TextArea className="text-area" showCount maxLength={500} />
		</Modal>
	);
};

export default NewPost;

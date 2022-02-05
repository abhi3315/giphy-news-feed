import React from "react";
import { useDispatch } from "react-redux";
import { Modal, Input, Popover, Button } from "antd";
import Giphy from "./Giphy";
import { prependPost } from "../redux/post";

const { TextArea } = Input;

const NewPost = ({ toggleModel, isOpen }) => {
	const dispatch = useDispatch();

	const [message, setMessage] = React.useState("");
	const [gif, setGif] = React.useState(null);

	const handleMessageChange = ({ target }) => setMessage(target.value || "");

	const handleAddPost = () => {
		dispatch(prependPost({ message, gif, date: new Date().toDateString() }));
		setMessage("");
		setGif(null);
		toggleModel();
	};

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
					content={<Giphy selectedGifId={gif} selectGif={setGif} />}
				>
					<Button>Select Gif</Button>
				</Popover>,
				<Button
					disabled={!message}
					onClick={handleAddPost}
					key="submit"
					type="primary"
				>
					Add Post
				</Button>,
			]}
		>
			<TextArea
				className="text-area"
				value={message}
				onChange={handleMessageChange}
				showCount
				maxLength={500}
			/>
		</Modal>
	);
};

export default NewPost;

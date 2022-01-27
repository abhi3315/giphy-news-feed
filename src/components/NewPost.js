import React from "react";
import { Modal, Input, Popover, Button } from "antd";
import Giphy from "./Giphy";
import { getGifs } from "../utils/giphy";

const NewPost = ({ toggleModel, isOpen }) => {
	const [gifs, setGifs] = React.useState([]);
	const [error, setError] = React.useState(false);
	const [loading, setLoading] = React.useState(false);
	const [loadingMore, setLoadingMore] = React.useState(false);
	const [search, setSearch] = React.useState("");
	const [offset, setOffset] = React.useState(0);

	const { TextArea } = Input;

	React.useEffect(() => {
		(async () => {
			try {
				const limit = 10;
				const { data } = await getGifs({ offset, limit });
				setGifs([...gifs, ...data]);
			} catch (e) {}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [offset]);

	return (
		<Modal
			title="20px to Top"
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
					content={<Giphy gifs={gifs} />}
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

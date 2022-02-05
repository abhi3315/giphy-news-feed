import React from "react";
import { useSelector } from "react-redux";
import { Typography, Card, Avatar } from "antd";

const { Paragraph } = Typography;
const { Meta } = Card;

const ListPosts = () => {
	const posts = useSelector((state) => state.post?.posts) || [];
	const user = useSelector((state) => state.user?.details);

	if (!posts.length) {
		return (
			<Paragraph className="text-center mt-10">No post found :(</Paragraph>
		);
	}

	return posts.map(({ gif, message, date }) => (
		<div className="post-container">
			<Card
				style={{ width: 400, marginTop: 10 }}
				{...(gif && {
					cover: (
						<img alt={gif} src={`https://i.giphy.com/media/${gif}/100.webp`} />
					),
				})}
			>
				<Paragraph>{message}</Paragraph>
				<Meta
					avatar={<Avatar src={user.imageUrl} />}
					title={user.name}
					description={date}
				/>
			</Card>
		</div>
	));
};

export default ListPosts;

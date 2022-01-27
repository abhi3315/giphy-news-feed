import React from "react";
import { Radio, Input, Row, Col, Button, Spin, message } from "antd";
import { getGifs } from "../utils/giphy";
import { debouncer } from "../utils/debouncer";

const Giphy = () => {
	const [gifs, setGifs] = React.useState([]);
	const [loading, setLoading] = React.useState(false);
	const [search, setSearch] = React.useState("");
	const [offset, setOffset] = React.useState(0);

	const loaderRef = React.useRef();

	React.useEffect(() => {
		(async () => {
			setLoading(true);
			try {
				const limit = 10;
				const { data } = await getGifs({ offset, limit, search });
				setGifs([...gifs, ...data]);
			} catch (e) {
				message.error({ content: "Unable to load Gifs" });
			}
			setLoading(false);
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [offset, search]);

	const handleObserver = React.useCallback((entries) => {
		const target = entries[0];
		if (target.isIntersecting && !loading) {
			setOffset((prev) => prev + 10);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	React.useEffect(() => {
		const option = {
			root: null,
			rootMargin: "20px",
			threshold: 0,
		};
		const observer = new IntersectionObserver(handleObserver, option);
		if (loaderRef.current) observer.observe(loaderRef.current);
	}, [handleObserver]);

	const handleSearch = (e) => {
		const { value } = e.target;
		setSearch(value);
		setGifs([]);
	};

	return (
		<>
			<Radio.Group optionType="button" buttonStyle="solid">
				<div className="gif-container mb-10">
					<Row gutter={16} className="w-300px m-auto">
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
						<div ref={loaderRef} />
						{!loading && (
							<div className="w-100">
								<Spin className="m-auto d-block" />
							</div>
						)}
					</Row>
				</div>
				<Row gutter={16} className="w-300px m-auto">
					<Col span={16}>
						<Input
							placeholder="Search Gifs"
							onInput={debouncer(handleSearch, 1000)}
						/>
					</Col>
					<Col span={8}>
						<Button className="width100">Select GIF</Button>
					</Col>
				</Row>
			</Radio.Group>
		</>
	);
};

export default Giphy;

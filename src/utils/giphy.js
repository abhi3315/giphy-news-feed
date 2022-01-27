const giphyRestBase = "https://api.giphy.com/v1/gifs";
const giphyApiKey = process.env.REACT_APP_GIPHY_API_KEY;

export const getGifs = async ({ limit, offset, search }) => {
	const queryParams = new URLSearchParams({
		api_key: giphyApiKey,
		limit,
		offset,
		...(search && { q: search }),
	});
	const res = await fetch(
		`${giphyRestBase}/${search ? "search" : "trending"}?${queryParams}`
	);

	if (!res.ok) throw new Error("Unable to fetch gifs.");

	return await res.json();
};

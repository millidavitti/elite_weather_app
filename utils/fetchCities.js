import axios from "axios";
export async function fetchCities(state) {
	const cities = [];
	const favourites = [];

	try {
		// Favourites
		for (const city of state.favourites) {
			params.q = city;

			const { data } = await axios.get(process.env.NEXT_PUBLIC_API_URL, {
				params,
			});

			favourites.push(data);
		}
		// Cities
		for (const city of state.cities) {
			params.q = city;

			const { data } = await axios.get(process.env.NEXT_PUBLIC_API_URL, {
				params,
			});

			cities.push(data);
		}
	} catch (error) {
		console.log(error);
	}
	return { cities, favourites };
}

const params = {
	key: process.env.NEXT_PUBLIC_API_KEY,
	q: "Beijing",
};

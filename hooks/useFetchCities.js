import axios from "axios";
import { useEffect } from "react";

export function useFecthCities(state, dispatch) {
	useEffect(() => {
		async function fetchCities() {
			const cities = [];
			const favourites = [];

			// params, state, store
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
			} catch (error) {}
			dispatch({
				type: "populous_cities",
				cities,
				favourites,
			});
		}

		fetchCities();
	}, [state.cities, dispatch, state.favourites]);
}
const params = {
	key: process.env.NEXT_PUBLIC_API_KEY,
	q: "Beijing",
};

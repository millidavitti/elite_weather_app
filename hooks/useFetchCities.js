import { fetchCities } from "@/utils/fetchCities";
import { useEffect } from "react";

export function useFecthCities(state, dispatch) {
	useEffect(() => {
		async function storeCities() {
			const { cities, favourites } = await fetchCities(state);

			dispatch({
				type: "populous_cities",
				cities,
				favourites,
			});
		}
		storeCities();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
}

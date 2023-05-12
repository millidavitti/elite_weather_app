import { fetchCities } from "@/utils/fetchCities";
import { useEffect } from "react";
import { checkCache } from "@/utils/checkCache";
import axios from "axios";
import { useGetFromLocalStorage } from "./useGetFromLocalStorage";
import { useReducers } from "./useReducers";

export function useUpdateCache(query, setCacheCity) {
	const { indexDispatch, indexState } = useReducers();
	const cache = useGetFromLocalStorage("app_state_cities", indexDispatch);

	useEffect(() => {
		const isCoordinate = coordinatesRegex.test(query.city);
		const expiration = JSON.parse(localStorage.getItem("update"));

		async function fetchWithCoord(isCoordinate) {
			try {
				if (isCoordinate || Date.now() >= expiration) {
					const { data } = await axios.get(process.env.NEXT_PUBLIC_API_URL, {
						params: {
							key: process.env.NEXT_PUBLIC_API_KEY,
							q: query.city,
						},
					});
					const { cities, favourites } = await fetchCities(indexState);

					// Updates Current City
					indexDispatch({ type: "revalidate_cache", city: data });

					// Updates Other Cities
					indexDispatch({
						type: "populous_cities",
						cities,
						favourites,
						revalidate: true,
					});
					setCacheCity({ isCached: false, city: data });
					localStorage.setItem(
						"update",
						JSON.stringify(Date.now() + 300 * 1000),
					);
					// Else handles page reloads
				} else setCacheCity(checkCache(cache, query.city));
			} catch (error) {
				// Handles Offline activity
				setCacheCity(checkCache(cache, query.city));
				localStorage.setItem("update", JSON.stringify(Date.now() + 60 * 1000));
				console.error(error);
			}
		}
		fetchWithCoord(isCoordinate);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [indexDispatch, cache, query]);
}
const coordinatesRegex = /^[-+]?[0-9]*\.?[0-9]+,[-+]?[0-9]*\.?[0-9]+$/;

export function checkCache(cache, query) {
	const parsed = JSON.parse(cache);
	const inCities = parsed?.api.cities.some(
		(city) => city.location.name.toLowerCase() === query?.toLowerCase(),
	);
	const inFavourites = parsed?.api.favourites.some(
		(city) => city.location.name.toLowerCase() === query?.toLowerCase(),
	);

	const city =
		parsed?.api.cities.find(
			(city) => city.location.name.toLowerCase() === query?.toLowerCase(),
		) ||
		parsed?.api.favourites.find(
			(city) => city.location.name.toLowerCase() === query?.toLowerCase(),
		);

	if (inCities || inFavourites)
		return {
			isCached: true,
			city,
		};
	else
		return {
			isCached: false,
			city: null,
		};
}

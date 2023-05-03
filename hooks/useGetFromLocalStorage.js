import { useEffect, useState } from "react";

export function useGetFromLocalStorage(key, dispatch = null) {
	const [cache, setCache] = useState(null);
	useEffect(() => {
		const savedState = localStorage.getItem(key);
		if (savedState) {
			setCache(savedState);
			dispatch &&
				dispatch({ type: "local_storage", data: JSON.parse(savedState) });
		}
	}, [dispatch, key]);
	return cache;
}

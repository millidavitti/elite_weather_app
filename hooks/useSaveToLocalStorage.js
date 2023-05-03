/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

export function useSaveToLocalStorage(state) {
	const router = useRouter();
	const savedStateRef = useRef(state);

	useEffect(() => {
		savedStateRef.current = state;
	}, [state]);

	useEffect(() => {
		function saveToLocalStorage() {
			localStorage.setItem(
				"app_state_cities",
				JSON.stringify(savedStateRef.current),
			);
		}

		router.events.on("routeChangeStart", saveToLocalStorage);
		return () => {
			router.events.off("routeChangeStart", saveToLocalStorage);
		};
	}, [state]);
}

// useEffect(() => {
// 	function saveToLocalStorage() {
// 		localStorage.setItem("app_state_cities", JSON.stringify(state));
// 	}
// 	router.events.on("routeChangeStart", saveToLocalStorage);
// 	return () => {
// 		router.events.off("routeChangeStart", saveToLocalStorage);
// 	};
// }, [JSON.stringify(state)]);

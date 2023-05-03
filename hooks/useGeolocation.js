import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export function useGeolocation() {
	const router = useRouter();

	useEffect(() => {
		let data;
		async function requestLocationPermission() {
			try {
				const permissionStatus = await navigator.permissions.query({
					name: "geolocation",
				});
				data = permissionStatus.state === "granted";

				if (data) return;
				navigator.geolocation.getCurrentPosition(
					(position) => {
						router.push(
							`/details/${position.coords.latitude},${position.coords.longitude}`,
						);
					},
					(error) => {
						console.log(error);
					},
				);
			} catch {
				data = false;
			}
		}
		requestLocationPermission();
	}, [router]);
}

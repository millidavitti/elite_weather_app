// /* eslint-disable react-hooks/exhaustive-deps */
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import List from "@/components/List";
import ListItem from "@/components/List/ListItem";
import Grid from "@/components/layout/Grid/Grid";
import Link from "next/link";
import {
	ArrowDown,
	ArrowElbowRight,
	Clock,
	ClockAfternoon,
	Cloud,
	Compass,
	Drop,
	Eye,
	GlobeHemisphereEast,
	GlobeHemisphereWest,
	House,
	MapPin,
	Plus,
	Sun,
	Thermometer,
	Timer,
	Wind,
	X,
} from "phosphor-react";
import Overlay from "@/components/layout/Overlay/Overlay";
import { useEffect, useState } from "react";
import { useGetFromLocalStorage } from "@/hooks/useGetFromLocalStorage";
import { useRouter } from "next/router";
import Flex from "@/components/layout/Flexbox/Flex";
import { checkCache } from "@/utils/checkCache";
import axios from "axios";
import { useReducers } from "@/hooks/useReducers";

// css
import details from "../../styles/details.module.css";
import home from "../../styles/Home.module.css";
import flex from "@/components/layout/Flexbox/flex.module.css";
import { fetchCities } from "@/utils/fetchCities";

export default function Details() {
	const [isActive, setIsActive] = useState(false);
	const [cacheCity, setCacheCity] = useState({
		isCached: false,
		city: null,
	});
	const { detailsState, detailsDispatch, indexDispatch, indexState } =
		useReducers();
	const query = useRouter().query;

	useGetFromLocalStorage("app_state_notes", detailsDispatch);
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
					setCacheCity({ isCached: false, city: data });
					indexDispatch({ type: "revalidate_cache", city: data });

					indexDispatch({
						type: "populous_cities",
						cities,
						favourites,
						revalidate: true,
					});
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
	}, [cache, indexDispatch, indexState, query.city]);

	// console.log(cacheCity);
	return (
		<>
			<Section>
				<Link href='/'>
					<House color='white' size={35} />
				</Link>

				<Container classes={csc.container}>
					<Grid classes={details.gap}>
						{/* Notes */}
						<List classes={csc.list}>
							{/* New Note Button */}
							<div
								onClick={() => {
									setIsActive(!isActive);
									detailsDispatch({ type: "new_note" });
								}}
							>
								<ListItem classes={csc.createNote}>
									<Plus />
								</ListItem>
							</div>

							{/* User Notes */}
							{detailsState.notes.map((note) => (
								<div
									key={note.id}
									onClick={(e) => {
										if (e.target.closest("span")?.dataset.target === "close") {
											detailsDispatch({
												type: "remove_note",
												id: e.currentTarget.id,
											});
											return;
										}

										setIsActive(!isActive);
										detailsDispatch({
											type: "edit_note",
											id: e.currentTarget.id,
										});
									}}
									id={note.id}
								>
									<ListItem classes={csc.lisItem}>
										{note.title}
										<span id={note.id} data-target='close'>
											<X />
										</span>
									</ListItem>
								</div>
							))}
						</List>

						{/* Details */}
						<div className={details.flex}>
							<Grid classes={csc.grid} minmax={true}>
								{/* City */}
								<div className={details.details}>
									<h3>CITY</h3>
									<span>
										<MapPin color='white' size={30} />
									</span>
									<p>{cacheCity.city?.location.name}</p>
								</div>
								{/* Latitude */}
								<div className={details.details}>
									<h3>LAT</h3>
									<span>
										<GlobeHemisphereEast color='white' size={30} />
									</span>
									<p>{cacheCity.city?.location.lat}</p>
								</div>
								{/* Longitude */}
								<div className={details.details}>
									<h3>LONG</h3>
									<span>
										<GlobeHemisphereWest color='white' size={30} />
									</span>
									<p>{cacheCity.city?.location.lon}</p>
								</div>
								{/* Wind Degree */}
								<div className={details.details}>
									<h3>WIND DEGREE</h3>
									<span>
										<ArrowElbowRight color='white' size={30} />
									</span>
									<p>{cacheCity.city?.current.wind_degree}&deg;</p>
								</div>
								{/* CLoud */}
								<div className={details.details}>
									<h3>CLOUD</h3>
									<span>
										<Cloud color='white' size={30} />
									</span>
									<p>{cacheCity.city?.current.cloud}%</p>
								</div>
								{/* Country */}
								<div className={details.details}>
									<h3>COUNTRY</h3>
									<span>
										<MapPin color='white' size={30} />
									</span>
									<p>{cacheCity.city?.location.country}</p>
								</div>
								{/* Local Time */}
								<div className={details.details}>
									<h3>LOCAL TIME</h3>
									<span>
										<ClockAfternoon color='white' size={30} />
									</span>
									<p>{cacheCity.city?.location.localtime.split(" ")[1]}</p>
								</div>
							</Grid>
							{/* Other details */}
							<Grid classes={csc.grid_001} minmax={true}>
								{/* UV Index */}
								<div className={details.details}>
									<h3>UV INDEX</h3>
									<span>
										<Sun color='white' size={50} />
									</span>
									<p>{cacheCity.city?.current.uv}</p>
								</div>
								{/* Wind Speed */}
								<div className={details.details}>
									<h3>WIND SPEED</h3>
									<span>
										<Wind color='white' size={50} />
									</span>
									<p>{cacheCity.city?.current.wind_kph}kph</p>
								</div>
								{/* Humidity */}
								<div className={details.details}>
									<h3>HUMIDITY</h3>
									<span>
										<Drop color='white' size={50} />
									</span>
									<p>{cacheCity.city?.current.humidity}%</p>
								</div>
								{/* Visibility */}
								<div className={details.details}>
									<h3>VISIBILITY</h3>
									<span>
										<Eye color='white' size={50} />
									</span>
									<p>{cacheCity.city?.current.vis_km}km</p>
								</div>
								{/* Pressure */}
								<div className={details.details}>
									<h3>PRESSURE</h3>
									<span>
										<ArrowDown color='white' size={50} />
									</span>
									<p>{cacheCity.city?.current.pressure_mb}mb</p>
								</div>
								{/* Time Zone */}
								<div className={details.details}>
									<h3>TIME ZONE</h3>
									<span>
										<Clock color='white' size={50} />
									</span>
									<p>{cacheCity.city?.location.tz_id}</p>
								</div>
								{/* Wind Direction */}
								<div className={details.details}>
									<h3>WIND DIRECTION</h3>
									<span>
										<Compass color='white' size={50} />
									</span>
									<p>{cacheCity.city?.current.wind_dir}</p>
								</div>
								{/* Wind Direction */}
								<div className={details.details}>
									<h3>FEELS LIKE</h3>
									<span>
										<Thermometer color='white' size={50} />
									</span>
									<p>{cacheCity.city?.current.feelslike_c}&deg;C</p>
								</div>
							</Grid>
						</div>
						{/* Text Area */}
						<Overlay isActive={isActive} setIsActive={setIsActive}>
							<form className={details.textareaWrp}>
								<Flex classes={flex.flexColumn}>
									<input
										type='text'
										id='title'
										className={details.noteTitle}
										placeholder='Give your notes a title...'
										onChange={(e) => {
											detailsDispatch({
												type: "create_note",
												id: e.target.id,
												value: e.target.value,
											});
										}}
										value={detailsState.tempNote?.title}
									/>
									<textarea
										className={details.textarea}
										cols='60'
										rows='10'
										id='note'
										placeholder='Your note...'
										onChange={(e) => {
											detailsDispatch({
												type: "create_note",
												id: e.target.id,
												value: e.target.value,
											});
										}}
										value={detailsState.tempNote?.note}
									/>
								</Flex>
								<button
									className={details.save}
									onClick={(e) => {
										e.preventDefault();
										const isTitleUnique = !detailsState.notes.some(
											(note) => note.title === detailsState.tempNote.title,
										);

										if (
											!detailsState.tempNote.title ||
											(isTitleUnique && !detailsState.isEditing)
										)
											return;
										detailsDispatch({ type: "save_note" });
										setIsActive(!isActive);
									}}
								>
									Save Note
								</button>
							</form>
						</Overlay>
					</Grid>
				</Container>
			</Section>
		</>
	);
}

const coordinatesRegex = /^[-+]?[0-9]*\.?[0-9]+,[-+]?[0-9]*\.?[0-9]+$/;
// To be used with Component Style Config
const csc = {
	container: details.container,
	grid: [details.grid],
	grid_001: [details.grid_001, details.grid_001],
	list: [details.list],
	createNote: [details.createNote],
	lisItem: [home.listFlex],
};

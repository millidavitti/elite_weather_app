/* eslint-disable react-hooks/exhaustive-deps */
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import List from "@/components/List";
import Grid from "@/components/layout/Grid";
import { useSaveToLocalStorage } from "@/hooks/useSaveToLocalStorage";
import { useFecthCities } from "@/hooks/useFetchCities";
import { useGetFromLocalStorage } from "@/hooks/useGetFromLocalStorage";
import { useGeolocation } from "@/hooks/useGeolocation";
import FavouriteCity from "@/components/FavouriteCity";
import City from "@/components/City/City";
import SearchBar from "@/components/SearchBar/SearchBar";
import { v4 as uuid } from "uuid";

// css
import home from "../styles/Home.module.css";
import { useReducers } from "@/hooks/useReducers";
import { SyncLoader } from "react-spinners";

export default function Home() {
	const { indexState, indexDispatch } = useReducers();

	useFecthCities(indexState, indexDispatch);
	useSaveToLocalStorage(indexState);
	useGetFromLocalStorage("app_state_cities", indexDispatch);
	useGeolocation();

	// console.log(state);
	return (
		<>
			<Section>
				<Container classes={csc.container}>
					<Grid>
						<List classes={csc.list}>
							<h3>Favourites</h3>
							{indexState.api.favourites ? (
								indexState.api.favourites.map((fav) => (
									<FavouriteCity
										key={uuid()}
										city={fav}
										dispatch={indexDispatch}
									/>
								))
							) : (
								<SyncLoader style={{ margin: "0 auto" }} />
							)}
							<hr />

							<h3>Cities</h3>
							{indexState.api.cities ? (
								indexState.api.cities?.map((city) => (
									<City key={uuid()} city={city} dispatch={indexDispatch} />
								))
							) : (
								<SyncLoader style={{ margin: "0 auto" }} />
							)}
						</List>

						{/* Serach box */}
						<div className={home.search}>
							<SearchBar
								searchQuery={indexState.searchQuery}
								dispatch={indexDispatch}
							/>
						</div>
					</Grid>
				</Container>
			</Section>
		</>
	);
}

// To be used with Component Style Config (CSC)

const csc = {
	container: [home.container],
	searchBar: [home.searchBar],
	list: [home.list],
};

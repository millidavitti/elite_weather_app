import Link from "next/link";
import { X, Star } from "phosphor-react";
import ListItem from "../List/ListItem";
import home from "../../styles/Home.module.css";
import { v4 as uuid } from "uuid";

export default function FavouriteCity({ city, dispatch }) {
	return (
		<ListItem key={uuid()} classes={csc.lisItem}>
			<Link
				href={`/details/${city.location.name.toLowerCase()}`}
				data-testid='city-name'
			>
				{city.location.name}
			</Link>
			<p style={{ fontSize: "0.8rem" }} data-testid='city-temperature'>
				{city.current.temp_c}&deg;C
			</p>
			<span style={{ display: "flex", gap: "10px" }}>
				<span
					id={city}
					onClick={() => {
						dispatch({
							type: "delete_city_from_favourites",
							id: city.location.name,
						});
					}}
					data-testid='delete-button'
				>
					<X />
				</span>
				<span
					onClick={() => {
						dispatch({
							type: "remove_from_favourites",
							data: city.location.name,
						});
					}}
					data-testid='star-button'
				>
					<Star />
				</span>
			</span>
		</ListItem>
	);
}
const csc = {
	lisItem: [home.listFlex],
};

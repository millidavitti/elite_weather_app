import { Star, X } from "phosphor-react";
import ListItem from "../List/ListItem";
import home from "../../styles/Home.module.css";
import Link from "next/link";
import { v4 as uuid } from "uuid";

export default function City({ city, dispatch }) {
	return (
		<ListItem classes={csc.lisItem} key={uuid()}>
			<Link href={`/details/${city.location.name.toLowerCase()}`}>
				{city.location.name}
			</Link>
			<p style={{ fontSize: "0.8rem" }}>{city.current.temp_c}&deg;C</p>
			<span style={{ display: "flex", gap: "10px" }}>
				<span
					onClick={() => {
						dispatch({
							type: "delete_city_from_list",
							id: city.location.name,
						});
					}}
					data-testid='delete-button'
				>
					<X />
				</span>
				<span
					onClick={() =>
						dispatch({ type: "add_to_favourites", data: city.location.name })
					}
					id={city.location.name}
					data-testid='star-button'
				>
					<Star />
				</span>
			</span>
		</ListItem>
	);
}

const csc = {
	list: [home.list],
	lisItem: [home.listFlex],
};

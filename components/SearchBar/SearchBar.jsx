import { useRef } from "react";
import { useRouter } from "next/router";
import Flex from "../layout/Flexbox/Flex";
import home from "../../styles/Home.module.css";
import axios from "axios";
import { MagnifyingGlass } from "phosphor-react";

export default function SearchBar({ searchQuery, dispatch }) {
	const router = useRouter();
	const searchRef = useRef(null);

	async function handleSearch() {
		if (!searchQuery) {
			searchRef.current.focus();
			return;
		}

		try {
			const { data } = await axios.get(process.env.NEXT_PUBLIC_API_URL, {
				params: {
					key: process.env.NEXT_PUBLIC_API_KEY,
					q: searchQuery,
				},
			});

			dispatch({
				type: "add_city_to_list",
				data,
				city: searchQuery,
			});
			router.push(`/details/${searchQuery}`);
		} catch (error) {
			console.log("Invalid City: ", searchQuery, error);
			dispatch({
				type: "search_query",
				data: "",
			});
		}
	}

	function handleInputChange(e) {
		dispatch({
			type: "search_query",
			data: e.target.value,
		});
	}

	function handleKeyDown(e) {
		if (e.key !== "Enter") return;
		handleSearch();
	}

	return (
		<Flex classes={csc.searchBar}>
			<input
				type='text'
				placeholder='Search city...'
				onChange={handleInputChange}
				onKeyDown={handleKeyDown}
				value={searchQuery}
				ref={searchRef}
			/>
			<MagnifyingGlass
				onClick={handleSearch}
				size={40}
				style={{ cursor: "pointer" }}
			/>
		</Flex>
	);
}

const csc = {
	searchBar: [home.searchBar],
};

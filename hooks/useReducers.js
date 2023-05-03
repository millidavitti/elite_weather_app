import { checkCache } from "@/utils/checkCache";
import { useReducer } from "react";
import { v4 as uuid } from "uuid";

export function useReducers() {
	const [indexState, indexDispatch] = useReducer(indexReducer, indexInit);
	const [detailsState, detailsDispatch] = useReducer(
		detailsReducer,
		detailsInit,
	);

	return {
		indexState,
		indexDispatch,
		detailsState,
		detailsDispatch,
	};
}
const cities = [
	"Beijing",
	"Cairo",
	"Delhi",
	"Dhaka",
	"Guangzhou",
	"Istanbul",
	"Karachi",
	"Kinshasa",
	"Lagos",
	"Lima",
	"Mumbai",
	"Osaka",
	"São Paulo",
	"Shanghai",
	"Tokyo",
];

// Index Page Reducer
const indexInit = {
	api: {
		cities: null,
		favourites: null,
	},
	cities,
	searchQuery: "",
	favourites: ["Abuja"],
};

function indexReducer(state, action) {
	switch (action.type) {
		case "populous_cities":
			const savedState = localStorage.getItem("app_state_cities");

			if (savedState) return state;

			return {
				...state,
				api: {
					...state.api,
					cities: action.cities,
					favourites: action.favourites,
				},
			};
		case "delete_city_from_list":
			const delete_city_from_list = {
				...state,
				api: {
					...state.api,
					cities: state.api.cities.filter(
						(city) =>
							city.location.name.toLowerCase() !== action.id.toLowerCase(),
					),
				},
				cities: state.cities
					.filter((city) => city.toLowerCase() !== action.id.toLowerCase())
					.sort(),
			};
			localStorage.setItem(
				"app_state_cities",
				JSON.stringify(delete_city_from_list),
			);
			return delete_city_from_list;
		case "delete_city_from_favourites":
			const delete_city_from_favourites = {
				...state,
				api: {
					...state.api,
					favourites: state.api.favourites
						.filter(
							(city) =>
								city.location.name.toLowerCase() !== action.id.toLowerCase(),
						)
						.sort(),
				},
				favourites: state.favourites
					.filter((city) => city.toLowerCase() !== action.id.toLowerCase())
					.sort(),
			};
			localStorage.setItem(
				"app_state_cities",
				JSON.stringify(delete_city_from_favourites),
			);
			return delete_city_from_favourites;
		case "add_city_to_list":
			const cache = localStorage.getItem("app_state_cities");
			if (checkCache(cache, action.city).isCached) return state;
			const add_city_to_list = {
				...state,
				cities: [action.city, ...state.cities].sort(),
				api: {
					...state.api,
					cities: [action.data, ...state.api.cities].sort(compare),
				},
			};
			localStorage.setItem(
				"app_state_cities",
				JSON.stringify(add_city_to_list),
			);
			return add_city_to_list;
		case "revalidate_cache":
			const bool = state.api.favourites.some(
				(city) =>
					city.location.name.toLowerCase() ===
					action.city.location.name.toLowerCase(),
			);

			const cache_to_validate = bool ? "favourites" : "cities";

			const revalidated_cache = {
				...state,
				api: {
					...state.api,
					[cache_to_validate]: state.api[cache_to_validate].map((city) => {
						if (city.location.name === action.city.location.name) {
							return action.city;
						} else return city;
					}),
				},
			};
			localStorage.setItem(
				"app_state_cities",
				JSON.stringify(revalidated_cache),
			);

			return revalidated_cache;

		case "search_query":
			return { ...state, searchQuery: action.data };
		case "add_to_favourites":
			const filter_from_cities = state.cities.filter(
				(city) => city !== action.data,
			);
			const filter_from_api_cities = state.api.cities.filter(
				(city) => city.location.name !== action.data,
			);
			const new_favourite = state.api.cities.find(
				(city) => city.location.name === action.data,
			);
			const add_to_favourites = {
				...state,
				api: {
					...state.api,
					favourites: [new_favourite, ...state.api.favourites].sort(compare),
					cities: filter_from_api_cities,
				},
				favourites: [action.data, ...state.favourites].sort(),
				cities: filter_from_cities.sort(),
			};
			localStorage.setItem(
				"app_state_cities",
				JSON.stringify(add_to_favourites),
			);
			return add_to_favourites;
		case "remove_from_favourites":
			const filter_from_favs = state.favourites.filter(
				(city) => city !== action.data,
			);
			const filter_from_api_favs = state.api.favourites.filter(
				(city) => city.location.name !== action.data,
			);
			const removed_favourite = state.api.favourites.find(
				(city) => city.location.name === action.data,
			);
			const remove_from_favourites = {
				...state,
				api: {
					...state.api,
					favourites: filter_from_api_favs,
					cities: [removed_favourite, ...state.api.cities].sort(compare),
				},
				favourites: filter_from_favs,
				cities: [action.data, ...state.cities].sort(),
			};
			localStorage.setItem(
				"app_state_cities",
				JSON.stringify(remove_from_favourites),
			);
			return remove_from_favourites;
		case "local_storage":
			return { ...action.data, searchQuery: "" };
		default:
			return state;
	}
}
function compare(a, b) {
	const nameA = a.location.name.toUpperCase();
	const nameB = b.location.name.toUpperCase();

	if (nameA < nameB) return -1;
	else if (nameA > nameB) return 1;
	else return 0;
}

// Details Page Reducer
const detailsInit = {
	tempNote: {
		id: "",
		title: "",
		note: "",
	},
	isEditing: false,
	notes: [
		{ id: "unique", title: "My new note", note: "This is an example new note" },
	],
};

function detailsReducer(state, action) {
	switch (action.type) {
		case "create_note":
			return {
				...state,
				tempNote: { ...state.tempNote, [action.id]: action.value },
				isEditing: true,
			};
		case "save_note":
			let save_note;
			if (state.isEditing && state.tempNote.id) {
				save_note = {
					...state,
					notes: state.notes.map((note) => {
						if (note.id === state.tempNote.id)
							return { ...state.tempNote, id: note.id || uuid() };
						else return note;
					}),
					isEditing: false,
				};
			} else {
				save_note = {
					...state,
					notes: [{ ...state.tempNote, id: uuid() }, ...state.notes],
					isEditing: false,
				};
			}
			localStorage.setItem("app_state_notes", JSON.stringify(save_note));
			return save_note;
		case "remove_note":
			const remove_note = {
				...state,
				notes: state.notes.filter((note) => note.id !== action.id),
			};
			localStorage.setItem("app_state_notes", JSON.stringify(remove_note));
			return remove_note;
		case "edit_note":
			const edit_note = {
				...state,
				tempNote: state.notes.find((note) => note.id === action.id),
				isEditing: true,
			};
			return edit_note;
		case "new_note":
			const new_note = {
				...state,
				tempNote: { title: "", note: "", id: "" },
			};
			return new_note;
		case "local_storage":
			return { ...action.data };

		default:
			return state;
	}
}

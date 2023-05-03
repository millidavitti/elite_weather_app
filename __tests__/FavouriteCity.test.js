import { render, fireEvent } from "@testing-library/react";
import FavouriteCity from "@/components/FavouriteCity";

describe("FavouriteCity", () => {
	const city = {
		location: { name: "London" },
		current: { temp_c: 15 },
	};
	const dispatch = jest.fn();

	it("renders the city name and temperature", () => {
		const { getByTestId } = render(
			<FavouriteCity city={city} dispatch={dispatch} />,
		);
		expect(getByTestId("city-name")).toHaveTextContent("London");
		expect(getByTestId("city-temperature")).toHaveTextContent("15°C");
	});

	it("dispatches the delete_city_from_favourites action when delete button is clicked", () => {
		const { getByTestId } = render(
			<FavouriteCity city={city} dispatch={dispatch} />,
		);
		fireEvent.click(getByTestId("delete-button"));
		expect(dispatch).toHaveBeenCalledWith({
			type: "delete_city_from_favourites",
			id: "London",
		});
	});

	it("dispatches the remove_from_favourites action when star button is clicked", () => {
		const { getByTestId } = render(
			<FavouriteCity city={city} dispatch={dispatch} />,
		);
		fireEvent.click(getByTestId("star-button"));
		expect(dispatch).toHaveBeenCalledWith({
			type: "remove_from_favourites",
			data: "London",
		});
	});
});

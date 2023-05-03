import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import City from "@/components/City/City";

describe("City component", () => {
	const mockDispatch = jest.fn();

	const cityData = {
		location: {
			name: "London",
		},
		current: {
			temp_c: 15,
		},
	};

	beforeEach(() => {
		mockDispatch.mockClear();
	});

	it("renders the city name", () => {
		render(<City city={cityData} dispatch={mockDispatch} />);
		expect(screen.getByText("London")).toBeInTheDocument();
	});

	it("renders the city temperature", () => {
		render(<City city={cityData} dispatch={mockDispatch} />);
		expect(screen.getByText("15°C")).toBeInTheDocument();
	});

	it("dispatches delete_city_from_list action when X is clicked", () => {
		render(<City city={cityData} dispatch={mockDispatch} />);
		const deleteButton = screen.getByTestId("delete-button");
		fireEvent.click(deleteButton);
		expect(mockDispatch).toHaveBeenCalledWith({
			type: "delete_city_from_list",
			id: "London",
		});
	});

	it("dispatches add_to_favourites action when Star is clicked", () => {
		render(<City city={cityData} dispatch={mockDispatch} />);
		const starButton = screen.getByTestId("star-button");
		fireEvent.click(starButton);
		expect(mockDispatch).toHaveBeenCalledWith({
			type: "add_to_favourites",
			data: "London",
		});
	});
});

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchBar from "@/components/SearchBar/SearchBar";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
	useRouter: jest.fn(),
}));

describe("SearchBar", () => {
	test('dispatches "add_city_to_list" action when search is successful', async () => {
		const dispatchMock = jest.fn();
		const pushMock = jest.fn();
		useRouter.mockReturnValue({ push: pushMock });
		const searchQuery = "New York";
		render(<SearchBar searchQuery={searchQuery} dispatch={dispatchMock} />);
		const searchInput = screen.getByPlaceholderText("Search city...");

		fireEvent.change(searchInput, { target: { value: searchQuery } });
		fireEvent.keyDown(searchInput, { key: "Enter" });

		await waitFor(() => {
			expect(dispatchMock).toHaveBeenCalledWith({
				type: "add_city_to_list",
				data: expect.anything(),
				city: searchQuery,
			});
			expect(pushMock).toHaveBeenCalledWith(`/details/${searchQuery}`);
		});
	});

	test('dispatches "search_query" action with empty string when search fails', async () => {
		const dispatchMock = jest.fn();
		const searchQuery = "Invaliity";
		render(<SearchBar searchQuery={searchQuery} dispatch={dispatchMock} />);
		const searchInput = screen.getByPlaceholderText("Search city...");

		fireEvent.change(searchInput, { target: { value: searchQuery } });
		fireEvent.keyDown(searchInput, { key: "Enter" });

		await waitFor(() => {
			expect(dispatchMock).toHaveBeenCalledWith({
				type: "search_query",
				data: "",
			});
		});
	});
});

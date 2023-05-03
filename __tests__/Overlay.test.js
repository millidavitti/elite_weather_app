import { render, fireEvent } from "@testing-library/react";
import Overlay from "@/components/layout/Overlay/Overlay";

describe("Overlay", () => {
	it("renders correctly when isActive is true", () => {
		const { getByTestId } = render(
			<Overlay isActive={true}>
				<div data-testid='child'>Child content</div>
			</Overlay>,
		);

		const overlay = getByTestId("overlay");
		overlay.classList.add("show");
		expect(overlay).toHaveClass("overlay show");

		const child = getByTestId("child");
		expect(child).toBeInTheDocument();
	});

	it("renders correctly when isActive is false", () => {
		const { getByTestId } = render(
			<Overlay isActive={false}>
				<div data-testid='child'>Child content</div>
			</Overlay>,
		);

		const overlay = getByTestId("overlay");
		overlay.classList.remove("show");
		expect(overlay).not.toHaveClass("overlay show");

		const child = getByTestId("child");
		expect(child).toBeInTheDocument();
	});

	it("calls setIsActive when overlay is clicked", () => {
		const setIsActive = jest.fn();
		const { getByTestId } = render(
			<Overlay isActive={true} setIsActive={setIsActive}>
				<div data-testid='child'>Child content</div>
			</Overlay>,
		);

		const overlay = getByTestId("overlay");
		fireEvent.click(overlay);

		expect(setIsActive).toHaveBeenCalledTimes(1);
		expect(setIsActive).toHaveBeenCalledWith(false);
	});
});

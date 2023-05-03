import Container from "@/components/layout/Container/Container";
import { render } from "@testing-library/react";

describe("Container", () => {
	it("should add the given classes to the container element", () => {
		const classes = ["class1", "class2"];
		const { getByTestId } = render(
			<Container classes={classes}>Test Content</Container>,
		);

		const container = getByTestId("container");
		classes.forEach((className) => {
			expect(container.classList.contains(className)).toBe(true);
		});
	});

	it("should remove the added classes when unmounted", () => {
		const classes = ["class1", "class2"];
		const { unmount, container } = render(
			<Container classes={classes}>Test Content</Container>,
		);

		unmount();
		classes.forEach((className) => {
			expect(container.classList.contains(className)).toBe(false);
		});
	});
});

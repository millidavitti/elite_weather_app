import { useEffect, useRef } from "react";
import flex from "./flex.module.css";

export default function Flex({ children, classes }) {
	const elementRef = useRef(null);

	useEffect(() => {
		const element = elementRef.current;
		if (!element) return;

		const classNames = Array.isArray(classes) ? classes : [classes];
		classNames.forEach((className) => {
			element.classList.add(className);
		});

		return () => {
			classNames.forEach((className) => {
				element.classList.remove(className);
			});
		};
	}, [classes]);

	return (
		<div ref={elementRef} className={flex.flex}>
			{children}
		</div>
	);
}

import { useEffect, useRef } from "react";
import container from "./container.module.css";
export default function Container({ children, classes }) {
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
		<div
			ref={elementRef}
			data-testid='container'
			className={container.container}
		>
			{children}
		</div>
	);
}

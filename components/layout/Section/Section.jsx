import { useEffect, useRef } from "react";
import section from "./section.module.css";

export default function Section({ children, classes = [] }) {
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
		<section ref={elementRef} className={section.section}>
			{children}
		</section>
	);
}

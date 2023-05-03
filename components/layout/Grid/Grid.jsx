import { useEffect, useRef } from "react";
import grid from "./grid.module.css";

export default function Grid({ children, classes, minmax = false }) {
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

	// iF minmax is true it returns adiv with no classs
	return minmax ? (
		<div ref={elementRef}>{children}</div>
	) : (
		<div ref={elementRef} className={grid.grid}>
			{children}
		</div>
	);
}

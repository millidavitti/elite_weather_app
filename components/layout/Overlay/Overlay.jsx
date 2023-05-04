import React, { useEffect, useRef } from "react";
import overlay from "./overlay.module.css";
import dynamic from "./overlay.module.css";
export default function Overlay({ children, isActive, setIsActive }) {
	const elem = useRef();

	useEffect(() => {
		if (isActive) elem.current.classList.add(dynamic.show);
		else elem.current.classList.remove(dynamic.show);
	}, [isActive]);
	return (
		<div
			className={overlay.overlay}
			onClick={(e) => {
				if (e.target.className !== e.currentTarget.className) return;
				setIsActive(!isActive);
			}}
			data-testid='overlay'
			ref={elem}
		>
			{children}
		</div>
	);
}

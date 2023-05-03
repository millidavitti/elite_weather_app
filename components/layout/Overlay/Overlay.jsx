import React, { useEffect, useRef, useState } from "react";
import overlay from "./overlay.module.css";
import dynamic from "./overlay.module.css";
export default function Overlay({ children, isActive, setIsActive }) {
	const elem = useRef();

	useEffect(() => {
		elem.current.classList.toggle(dynamic.show);
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

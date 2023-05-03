import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Portal({ children, root }) {
	const modalRoot = useRef();

	useEffect(() => {
		modalRoot.current = document.getElementById(root);
	});

	return modalRoot ? createPortal(children, modalRoot) : null;
}

import { RefObject, useEffect, useRef, useState } from "react";

export const useScrollPosition = (
	element: RefObject<HTMLElement>,
	delay: number
): number => {
	const [scrollTopPosition, setScrollTopPosition] = useState<number>(0);
	const timer = useRef<any>(null);
	const refereedElement = element.current;

	useEffect(() => {
		const updatePosition = () => {
			timer.current = setTimeout(
				() =>
					refereedElement && setScrollTopPosition(refereedElement.scrollTop),
				delay || 500
			);
		};
		refereedElement &&
			refereedElement.addEventListener("scroll", updatePosition);
		return () => {
			refereedElement &&
				refereedElement.removeEventListener("scroll", updatePosition);
			clearTimeout(timer.current);
		};
	}, [delay, refereedElement]);

	return scrollTopPosition;
};

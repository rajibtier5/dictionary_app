import {
	RefObject,
	useCallback,
	useLayoutEffect,
	useRef,
	useState,
} from "react";

export function useScrollPosition(
	element: RefObject<HTMLElement>,
	wait: number = 0
) {
	const [position, setPosition] = useState(0);
	const throttleTimeout: any = useRef(null);

	const callBack = useCallback(() => {
		element && element.current && setPosition(element.current.scrollTop);
		throttleTimeout.current = null;
	}, [element]);

	useLayoutEffect(() => {
		const currentElement = element.current;
		const handleScroll = () => {
			if (wait) {
				if (throttleTimeout === null) {
					throttleTimeout.current = setTimeout(callBack, wait);
				}
			} else {
				callBack();
			}
		};
		currentElement && currentElement.addEventListener("scroll", handleScroll);
		return () => {
			clearTimeout(throttleTimeout.current);
			currentElement &&
				currentElement.removeEventListener("scroll", handleScroll);
		};
	}, [callBack, element, wait]);

	return position;
}

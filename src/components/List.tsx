import { FC, ReactElement, useEffect, useRef, useState } from "react";
import { useScrollPosition } from "../hooks/useScrollPosition";
import ListItem from "./ListItem";
import SafelyRenderChildren from "./SafelyRenderChildren";
import styles from "../styles/List.module.css";

export interface ListProps {
	items: string[];
	children?: ReactElement;
}

const List: FC<ListProps> = ({ items, children }) => {
	const ref = useRef(null);
	const scrollTopPosition = useScrollPosition(ref);
	const [startIndex, setStartIndex] = useState(0);
	const [endIndex, setEndIndex] = useState(2500);
	const lengthOfItems = items.length;

	useEffect(() => {
		// convert scrollPosition to the actual list element
		const currentElementIndex = Math.floor(scrollTopPosition / 30);
		setStartIndex(Math.max(0, currentElementIndex - 30));
		setEndIndex(Math.min(currentElementIndex + 30, lengthOfItems));

		console.log(startIndex, endIndex);
	}, [scrollTopPosition, lengthOfItems]);

	return (
		<div
			className={styles.scrollWrapper}
			ref={ref}
		>
			<ul className={styles.listWrapper}>
				{/**
				 * Note: `SafelyRenderChildren` should NOT be removed while solving
				 * this interview. This prevents rendering too many list items and
				 * potentially crashing the web page. This also enforces an artificial
				 * limit (5,000) to the amount of children that can be rendered at one
				 * time during virtualization.
				 */}
				<SafelyRenderChildren>
					{items.slice(startIndex, endIndex).map((word) => (
						<ListItem key={word}>{word}</ListItem>
					))}
				</SafelyRenderChildren>
			</ul>
		</div>
	);
};

export default List;

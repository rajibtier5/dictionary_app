import { FC, useRef, useMemo } from "react";
import { useScrollPosition } from "../hooks/useScrollPosition";
import ListItem from "./ListItem";
import SafelyRenderChildren from "./SafelyRenderChildren";
import styles from "../styles/List.module.css";

export interface ListProps {
	items: string[];
	listHeight?: number;
	showNumberOfItems?: number;
}

const List: FC<ListProps> = ({
	items = [],
	listHeight = 500,
	showNumberOfItems = 20,
}) => {
	const ref = useRef(null);
	const scrollTopPosition = useScrollPosition(ref, 500);

	const virtualList = useMemo(() => {
		const currentElementIndex = Math.floor(scrollTopPosition / listHeight);
		const startIndex = Math.max(0, currentElementIndex);
		const endIndex = Math.min(startIndex + showNumberOfItems, items.length);
		return items.slice(startIndex, endIndex);
	}, [items, listHeight, scrollTopPosition, showNumberOfItems]);

	return (
		<div
			ref={ref}
			className={styles.scrollWrapper}
			style={{ height: `${listHeight}px` }}
		>
			<ul
				className={styles.listWrapper}
				style={{
					height: `${items.length * 30}px`,
					top: `${scrollTopPosition}px`,
				}}
			>
				{/**
				 * Note: `SafelyRenderChildren` should NOT be removed while solving
				 * this interview. This prevents rendering too many list items and
				 * potentially crashing the web page. This also enforces an artificial
				 * limit (5,000) to the amount of children that can be rendered at one
				 * time during virtualization.
				 */}
				<SafelyRenderChildren>
					{virtualList.map((word, index) => (
						<ListItem key={index}>{word}</ListItem>
					))}
				</SafelyRenderChildren>
			</ul>
		</div>
	);
};

export default List;

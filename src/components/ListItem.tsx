import { FC, ReactNode } from "react";
import styles from "../styles/Item.module.css";

export interface ListItemProps {
	children: ReactNode;
	listItemHeight?: number;
}

const ListItem: FC<ListItemProps> = ({ children, listItemHeight = 30 }) => {
	return (
		<li
			className={styles.listItem}
			style={{ height: `${listItemHeight}px` }}
		>
			{children}
		</li>
	);
};

export default ListItem;

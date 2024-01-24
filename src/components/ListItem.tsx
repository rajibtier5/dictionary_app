import React, { FC, ReactNode } from "react";
import styles from "../styles/Item.module.css";

export interface ListItemProps {
	children: ReactNode;
}

const ListItem: FC<ListItemProps> = ({ children }) => {
	return <li className={styles.listItem}>{children}</li>;
};

export default ListItem;

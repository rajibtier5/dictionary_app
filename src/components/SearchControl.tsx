import { FC } from "react";
import styles from "../styles/SearchControl.module.css";

type SearchControlProps = {
	searchKey: string;
	onChangeSearchControl: (value: string) => void;
};

const SearchControl: FC<SearchControlProps> = ({
	searchKey,
	onChangeSearchControl,
}) => {
	return (
		<>
			<label>Search</label>
			<input
				className={styles.searchControl}
				type='text'
				value={searchKey}
				onChange={(event) => onChangeSearchControl(event.target.value)}
			/>
		</>
	);
};

export default SearchControl;

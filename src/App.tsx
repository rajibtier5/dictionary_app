import { useState } from "react";
import List from "./components/List";
import SearchControl from "./components/SearchControl";
import { useDebounce } from "./hooks/useDebounce";
import { useDictionaryData } from "./hooks/useDictionaryData";
import "./App.css";

function App() {
	const [searchKey, setSearchKey] = useState<string>("");
	const debouncedSearchKey = useDebounce<string>(searchKey, 500);
	const dictionaryData = useDictionaryData(debouncedSearchKey);

	return (
		<div className='app'>
			<div className='header'>
				<div>Render Virtualized</div>
				<SearchControl
					searchKey={searchKey}
					onChangeSearchControl={setSearchKey}
				/>
			</div>
			<div className='content'>
				<List items={dictionaryData} />
			</div>
		</div>
	);
}

export default App;

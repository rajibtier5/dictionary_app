import { useEffect, useState } from "react";

export type Dictionary = string[];

const getDictionaryData = async (searchParam: string): Promise<Dictionary> => {
	const response = await fetch(
		"https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt"
	);
	const data = await response.text();
	return searchParam
		? data
				.split("\r\n")
				.filter((item) =>
					item.toLowerCase().includes(searchParam.toLowerCase())
				)
		: data.split("\r\n");
};

export const useDictionaryData = (searchKey: string) => {
	const [dictionaryData, setDictionaryData] = useState<Dictionary>([]);
	useEffect(() => {
		getDictionaryData(searchKey).then((data) => setDictionaryData(data));
	}, [searchKey]);

	return dictionaryData;
};

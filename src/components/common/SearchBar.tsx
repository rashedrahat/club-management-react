import Input from "./form/Input";

type SearchBarProps = {
	placeHolder: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar = ({ placeHolder, value, onChange }: SearchBarProps) => {
	return (
		<Input
			type={"search"}
			name={"search"}
			className={
				"font-light shadow bg-white w-auto h-10 px-5 rounded-full text-sm focus:outline-none focus:shadow-md placeholder-gray-500 focus:placeholder-gray-400 text-gray-900"
			}
			placeHolder={placeHolder}
			value={value}
			onChange={(e) => onChange(e)}
		/>
	);
};

export default SearchBar;

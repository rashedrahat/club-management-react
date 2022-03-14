type InputProps = {
	type: string;
	name: string;
	autoComplete?: "on" | "off";
	required?: boolean;
	className?: string;
	placeHolder?: string;
	value: any;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({
	type,
	name,
	autoComplete = "off",
	required = true,
	className,
	placeHolder,
	value,
	onChange,
}: InputProps) => {
	return required ? (
		<input
			name={name}
			type={type}
			autoComplete={autoComplete}
			required
			className={className}
			placeholder={placeHolder}
			value={value}
			onChange={(e) => onChange(e)}
		/>
	) : (
		<>
			{type === "range" ? (
				<input
					name={name}
					type={type}
					className={className}
					min={50}
					max={100}
					step={5}
					value={value}
					onChange={(e) => onChange(e)}
				/>
			) : (
				<input
					name={name}
					type={type}
					autoComplete={autoComplete}
					className={className}
					placeholder={placeHolder}
					value={value}
					onChange={(e) => onChange(e)}
				/>
			)}
		</>
	);
};

export default Input;

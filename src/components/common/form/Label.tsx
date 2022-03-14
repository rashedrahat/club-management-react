type LabelProps = {
	htmlFor: string;
	name: string;
	className: string;
	required?: boolean;
};

const Label = ({ htmlFor, name, className, required = true }: LabelProps) => {
	return (
		<label htmlFor={htmlFor} className={className}>
			{name}
			<span
				className={required ? `text-red-600 inline text-base ml-1` : `hidden`}
			>
				*
			</span>
		</label>
	);
};

export default Label;

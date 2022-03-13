type LabelProps = {
	htmlFor: string;
	name: string;
	className: string;
};

const Label = ({ htmlFor, name, className }: LabelProps) => {
	return (
		<label htmlFor={htmlFor} className={className}>
			{name}
		</label>
	);
};

export default Label;

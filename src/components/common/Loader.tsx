import { css } from "@emotion/react";
import { PulseLoader } from "react-spinners";

type LoaderProps = {
	loading: boolean;
	color: string;
};

const Loader = ({ loading, color }: LoaderProps) => {
	const override = css`
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 1;
	`;

	return (
		<PulseLoader loading={loading} css={override} size={20} color={color} />
	);
};

export default Loader;

import React from "react";
import { Route, Redirect } from "react-router-dom";
import { appRoutes } from "utils/routes";

type AppProps = {
	Component: React.ElementType;
	auth: { isLoggedIn: boolean };
	path: string;
};

const PrivateRoute = ({ Component, auth, path }: AppProps) => {
	let isAuthenticated = false;
	if (auth.isLoggedIn) isAuthenticated = true;

	return (
		<Route
			exact
			path={path}
			render={(props) =>
				isAuthenticated ? (
					<Component {...props} />
				) : (
					<Redirect to={appRoutes.LOG_IN} />
				)
			}
		/>
	);
};

export default PrivateRoute;

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import "./App.css";
import { appRoutes } from "utils/routes";
import Navbar from "components/layout/Navbar";
import Login from "components/Login";
import PrivateRoute from "components/PrivateRoute";
import { useSelector, useDispatch } from "react-redux";
import { getAuthInfo } from "redux/selectors";
import { useEffect } from "react";
import { SET_LOGIN_CRED } from "redux/auth/auth.types";
import Clubs from "components/Clubs";
import Members from "components/Members";

function App() {
	const auth = useSelector((state) => getAuthInfo(state));
	const dispatch = useDispatch();

	useEffect(() => {
		const loggedInUser = localStorage.getItem("loggedInUser");
		if (loggedInUser)
			dispatch({
				type: SET_LOGIN_CRED,
				payload: JSON.parse(String(loggedInUser)),
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Router>
			<>
				<Navbar auth={auth} />
				<Switch>
					<Route path={appRoutes.LOG_IN} exact component={Login} />
					<PrivateRoute Component={Clubs} auth={auth} path={appRoutes.CLUBS} />
					<PrivateRoute
						Component={Members}
						auth={auth}
						path={appRoutes.MEMBERS}
					/>
					<Redirect to={appRoutes.LOG_IN} />
				</Switch>
			</>
		</Router>
	);
}

export default App;

import rootReducer from "./rootReducer";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";

const initialState = {};

const middleware = [thunk];

// dev tools middleware
const composeEnhancers =
	(process.env.NODE_ENV !== "production" &&
		(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose;

const store = createStore(
	rootReducer,
	initialState,
	composeEnhancers(applyMiddleware(...middleware))
);

export default store;

import { combineReducers } from "redux";
import authReducer from "redux/auth/auth.reducer";
import clubReducer from "redux/club/club.reducer";

const rootReducer = combineReducers({
	auth: authReducer,
	club: clubReducer,
});

export default rootReducer;

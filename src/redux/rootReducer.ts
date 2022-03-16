import { combineReducers } from "redux";
import authReducer from "redux/auth/auth.reducer";
import clubReducer from "redux/club/club.reducer";
import memberReducer from "redux/member/member.reducer";

const rootReducer = combineReducers({
	auth: authReducer,
	club: clubReducer,
	member: memberReducer,
});

export default rootReducer;

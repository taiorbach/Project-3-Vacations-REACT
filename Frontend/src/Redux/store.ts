import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { authReducer } from "./AuthState";
import { vacationReducer } from "./VacationState";


const reducers = combineReducers({authState: authReducer , vacationState: vacationReducer })


const store = createStore(reducers , composeWithDevTools())

export default store



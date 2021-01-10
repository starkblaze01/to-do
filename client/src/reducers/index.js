import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import toDoReducer from './toDoReducer';
export default combineReducers({
    errors: errorReducer,
    toDo: toDoReducer
});

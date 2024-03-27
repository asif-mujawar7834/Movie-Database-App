import { combineReducers } from "redux";
import { HomeReducer } from "./Reducers/HomeReducer";
export const reducer = combineReducers({
  homeSlice: HomeReducer,
});

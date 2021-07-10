import { combineReducers } from "redux";
import todoReducer from "./todo";

export default combineReducers({
  todo: todoReducer,
});

// !combinereducers akan menerima inputan sekumpulan dari reducer

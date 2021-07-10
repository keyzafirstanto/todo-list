import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./redux/reducers";
import ReduxThunk from "redux-thunk";

const thunk = (store) => {
  return (next) => {
    return (action) => {
      if (typeof actions === "function") {
        return action(store.dispatch);
      }

      return next(action);
    };
  };
};
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// redux-thunk adalah sebuah middleware(perantara)
// basically action creator harus mengirim ke Middleware dl yg nantinya akan dispatch action object
// syntax:
/**
  const thunk = store => {
  return next => {
    return action => {
      
    }
  }
}
* store = dia memeberikan akses untuk mengubah global state kita
* action = dia adalah action object (menyimpan sebuah action object)
*NEXT = FUNCTION YG MMPERBOLEHKAN ACTION UNTUK LNJUT KE DALAM REDUCER (MIRIP DISPATCH)
 */

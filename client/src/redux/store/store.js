import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import reducer from "../reducer/reducer";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose
//Esta linea sirve para conectar la app con el navegador

const store = createStore(reducer, composeEnhancer(applyMiddleware(thunkMiddleware))//Esta linea sirve para que podamos hacer paticiones a una API/SERVIDOR
);


export default store;
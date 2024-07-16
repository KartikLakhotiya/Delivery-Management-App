import { createStore } from "redux";
import menuReducer from "./menu/menu.reducer";
import userReducer from "./user/user.reducer";
import ordersReducer from "./orders/orders.reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  menu: menuReducer,
  user: userReducer,
  orders: ordersReducer
});

const store = createStore(rootReducer);

export default store;

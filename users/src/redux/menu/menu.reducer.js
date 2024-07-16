import { data as dishes } from "../../data/data";

import {
  INCREMENT,
  DECREMENT,
  REMOVE,
  SEARCH,
  CLEAR,
  BOOKMARK,
} from "./menu.types";
import { incItem, decItem, removeItem, clear, bookmark } from "./menu.utils";

const initialState = {
  menu: dishes,
  search: "",
};

const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        menu: incItem(state.menu, action.payload),
      };

    case DECREMENT:
      return {
        ...state,
        menu: decItem(state.menu, action.payload),
      };
    case REMOVE:
      return {
        ...state,
        menu: removeItem(state.menu, action.payload),
      };
    case SEARCH:
      return {
        ...state,
        search: action.payload,
      };
    case CLEAR:
      return {
        ...state,
        menu: clear(state.menu),
      };
    case BOOKMARK:
      return {
        ...state,
        menu: bookmark(state.menu, action.payload),
      };
    default:
      return state;
  }
};

export default menuReducer;

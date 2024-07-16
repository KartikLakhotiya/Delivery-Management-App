import {
  INCREMENT,
  DECREMENT,
  REMOVE,
  SEARCH,
  CLEAR,
  BOOKMARK,
} from "./menu.types";

export const increment = (id) => {
  return {
    type: INCREMENT,
    payload: id,
  };
};

export const decrement = (id) => {
  return {
    type: DECREMENT,
    payload: id,
  };
};

export const remove = (id) => {
  return {
    type: REMOVE,
    payload: id,
  };
};

export const search = (searchText) => {
  return {
    type: SEARCH,
    payload: searchText,
  };
};

export const total = () => {
  return {
    type: "TOTAL",
  };
};

export const clear = () => {
  return {
    type: CLEAR,
  };
};

export const bookmark = (id) => {
  return {
    type: BOOKMARK,
    payload: id,
  };
};

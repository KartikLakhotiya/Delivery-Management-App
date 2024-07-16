import { ADD_ORDER } from "./orders.types";

export const addOrder = (order) => {
  return {
    type: ADD_ORDER,
    payload: order,
  };
};

import { ADD_ORDER } from "./orders.types";

const initialState = {
  orders: [],
  order: {
    orderId: null,
    orderDate: null,
    orderStatus: null,
    orderTotal: null,
    orderItems: [],
    orderDeliveredBy: null,
  },
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };
    default:
      return state;
  }
};

export default ordersReducer;

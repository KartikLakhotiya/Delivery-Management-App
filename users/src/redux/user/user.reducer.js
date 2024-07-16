import { SIGNIN, SIGNOUT } from "./user.types";

const initialState = {
  user: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN:
      return {
        ...state,
        user: action.payload,
      };
    case SIGNOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default userReducer;

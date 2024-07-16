import { SIGNIN, SIGNOUT } from "./user.types";

export const signin = (user) => {
  return {
    type: SIGNIN,
    payload: user,
  };
};

export const signout = () => {
  return {
    type: SIGNOUT,
  };
};

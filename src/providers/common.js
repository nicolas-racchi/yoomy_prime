// This provider is responsible for all that piece of state that
// changes rarily and that doesn't relate to API data calls.

import { createContext, useContext, useReducer } from "react";

const StateContext = createContext();

// Types
export const SHOW_COOKIE_BANNER = "SHOW_COOKIE_BANNER";
export const SHOW_BETA_BANNER = "SHOW_BETA_BANNER";

// Initial state
export const initialState = {
  show_beta_banner:
    localStorage.getItem("show_beta_banner") === null
      ? true
      : localStorage.getItem("show_beta_banner"),
  show_cookie_banner:
    localStorage.getItem("show_cookie_banner") === null
      ? true
      : localStorage.getItem("show_cookie_banner"),
};

const reducer = (state, action) => {
  switch (action.type) {
    //? Controls whether to show or hide the cookie banner
    case SHOW_COOKIE_BANNER:
      localStorage.setItem("show_cookie_banner", action.show_cookie_banner);
      return {
        ...state,
        show_cookie_banner: action.show_cookie_banner,
      };

    //? Controls whether to show or hide the beta banner
    case SHOW_BETA_BANNER:
      localStorage.setItem("show_beta_banner", action.show_beta_banner);
      return {
        ...state,
        show_beta_banner: action.show_beta_banner,
      };

    default:
      return state;
  }
};

export const CommonProvider = ({ children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

const useCommonContext = () => useContext(StateContext);
export default useCommonContext;

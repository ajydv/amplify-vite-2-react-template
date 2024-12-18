import { AuthState } from "./types";

const initialState: AuthState = {
  jwtToken: null,
  refreshToken: null,
  userLoginId: null,
  loading: false,
  error: null,
};

type Action =
  | { type: "SET_AUTH_TOKENS"; payload: { jwtToken: string; refreshToken: string } }
  | { type: "SET_USER_LOGIN_ID"; payload: string | null }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "CLEAR_AUTH" };

const authReducer = (state = initialState, action: Action): AuthState => {
  switch (action.type) {
    case "SET_AUTH_TOKENS":
      return {
        ...state,
        jwtToken: action.payload.jwtToken,
        refreshToken: action.payload.refreshToken,
        loading: false,
        error: null,
      };

    case "SET_USER_LOGIN_ID":
      return {
        ...state,
        userLoginId: action.payload,
      };

    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case "CLEAR_AUTH":
      return {
        jwtToken: null,
        refreshToken: null,
        userLoginId: null,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};

export default authReducer;

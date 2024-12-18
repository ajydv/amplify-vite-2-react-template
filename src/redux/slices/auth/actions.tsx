export const setAuthTokens = (tokens: { jwtToken: string; refreshToken: string }) => ({
  type: "SET_AUTH_TOKENS",
  payload: tokens,
});

export const setUserLoginId = (userLoginId: string | null) => ({
  type: "SET_USER_LOGIN_ID",
  payload: userLoginId,
});

export const setLoading = (loading: boolean) => ({
  type: "SET_LOADING",
  payload: loading,
});

export const setError = (error: string | null) => ({
  type: "SET_ERROR",
  payload: error,
});

export const clearAuth = () => ({
  type: "CLEAR_AUTH",
});

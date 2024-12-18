import { useAuthenticator } from "@aws-amplify/ui-react";
import { CognitoUserPool, CognitoUserSession,CognitoRefreshToken } from "amazon-cognito-identity-js";
import amplifyOutputs from "../../amplify_outputs.json";

const poolData = {
  UserPoolId: amplifyOutputs.auth.user_pool_id,
  ClientId: amplifyOutputs.auth.user_pool_client_id,
};

const userPool = new CognitoUserPool(poolData);

export const getJWTToken = async (): Promise<{ jwtToken: string | null, refreshToken: string | null }> => {
  const currentUser = userPool.getCurrentUser();
  if (!currentUser) {
    console.error("No current user logged in");
    return { jwtToken: null, refreshToken: null };
  }

  return new Promise<{ jwtToken: string | null, refreshToken: string | null }>((resolve, reject) => {
    currentUser.getSession((err: Error | null, session: CognitoUserSession | null) => {
      if (err) {
        console.error("Error fetching session:", err);
        reject("Error fetching session");
        return;
      }

      if (!session) {
        console.error("Session is null");
        reject("Session is null");
        return;
      }

      const jwtToken = session.getIdToken().getJwtToken();
      const refreshToken = session.getRefreshToken().getToken();
      resolve({ jwtToken, refreshToken });
    });
  });
};

export const getUserLoginId = () => {
  const { user } = useAuthenticator();
  if (user && user.signInDetails && user.signInDetails.loginId) {
    return user.signInDetails.loginId;
  }
  return null;
};

export const refreshSession = async (refreshToken: string) => {
  const currentUser = userPool.getCurrentUser();
  if (!currentUser) {
    console.error("No current user logged in");
    return;
  }

  return new Promise((resolve, reject) => {
    const cognitoRefreshToken = new CognitoRefreshToken({ RefreshToken: refreshToken });
    currentUser.refreshSession(cognitoRefreshToken, (err, session) => {
      if (err) {
        console.error("Error refreshing session:", err);
        reject("Error refreshing session");
        return;
      }

      const newAccessToken = session.getAccessToken().getJwtToken();
      const newRefreshToken = session.getRefreshToken().getToken();
      console.log("New Access Token:", newAccessToken);
      console.log("New Refresh Token:", newRefreshToken);
      resolve({ newAccessToken, newRefreshToken });
    });
  });
};
import { useAuthenticator } from "@aws-amplify/ui-react";
import { CognitoUserPool, CognitoUserSession } from "amazon-cognito-identity-js";
import amplifyOutputs from "../../amplify_outputs.json";

const poolData = {
  UserPoolId: amplifyOutputs.auth.user_pool_id,
  ClientId: amplifyOutputs.auth.user_pool_client_id,
};

const userPool = new CognitoUserPool(poolData);

export const getJWTToken = async (): Promise<string | null> => {
  const currentUser = userPool.getCurrentUser();
  if (!currentUser) {
    console.error("No current user logged in");
    return null;
  }

  return new Promise<string | null>((resolve, reject) => {
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
      resolve(jwtToken);
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
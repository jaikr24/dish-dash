// hooks/useCognitoAuth.js
import { useState } from "react";
import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserPool,
} from "amazon-cognito-identity-js";

const userPool = new CognitoUserPool({
  UserPoolId: import.meta.env.VITE_USER_POOL_ID,
  ClientId: import.meta.env.VITE_CLIENT_ID,
});

export function useCognitoAuth() {
  const [user, setUser] = useState(getTokens());
  const [error, setError] = useState(null);

  function storeTokens(data) {
    localStorage.setItem("idToken", data.getIdToken().getJwtToken());
    localStorage.setItem("accessToken", data.getAccessToken().getJwtToken());
    localStorage.setItem("refreshToken", data.getRefreshToken().getToken());
  }

  function getTokens() {
    return {
      idToken: localStorage.getItem("idToken"),
      accessToken: localStorage.getItem("accessToken"),
      refreshToken: localStorage.getItem("refreshToken"),
    };
  }

  function signUp(name, email, password) {
    return new Promise((resolve, reject) => {
      // Attributes for the user
      const attributes = [{ Name: "name", Value: name }];

      // Sign up user
      userPool.signUp(email, password, attributes, null, (err, data) => {
        if (err) {
          reject(err.message || JSON.stringify(err));
          console.log(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  // Verify user method
  function verifyUser(email, verificationCode) {
    return new Promise((resolve, reject) => {
      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool,
      });

      cognitoUser.confirmRegistration(verificationCode, true, (err, result) => {
        if (err) {
          setError(err.message || JSON.stringify(err));
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  // Sign in method
  function signIn(email, password) {
    return new Promise(function (resolve, reject) {
      const authenticationDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      });

      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool,
      });

      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (data) {
          setUser(data); // Store CognitoUser object to use for future requests
          console.log(data);
          storeTokens(data); // Store tokens in localStorage
          resolve(data);
        },
        onFailure: function (err) {
          setError(err.message || JSON.stringify(err));
          reject(err);
        },

        newPasswordRequired: (data) => {
          // Handle new password required challenge
          const { requiredAttributes } = data;

          // Prompt user for new password
          const newPassword = prompt("Please enter a new password:"); // Replace with your own input mechanism

          if (newPassword) {
            cognitoUser.completeNewPasswordChallenge(
              newPassword,
              requiredAttributes,
              {
                onSuccess: (data) => {
                  setUser(data);
                  storeTokens(data);
                  resolve(data);
                },
                onFailure: (err) => {
                  setError(err.message || JSON.stringify(err));
                  reject(err);
                },
              }
            );
          } else {
            // Handle case where no new password was provided
            setError("New password is required.");
            reject(new Error("New password is required."));
          }
        },
      });
    });
  }

  // Initiate password reset
  function initiatePasswordReset(email) {
    return new Promise((resolve, reject) => {
      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool,
      });
      cognitoUser.forgotPassword({
        onSuccess: () => {
          resolve("Password reset code sent to your email.");
        },
        onFailure: (err) => {
          setError(err.message || JSON.stringify(err));
          reject(err);
        },
      });
    });
  }

  // Confirm new password
  function confirmPasswordReset(email, verificationCode, newPassword) {
    return new Promise((resolve, reject) => {
      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool,
      });
      cognitoUser.confirmPassword(verificationCode, newPassword, {
        onSuccess: () => {
          resolve("Password reset successful.");
        },
        onFailure: (err) => {
          setError(err.message || JSON.stringify(err));
          reject(err);
        },
      });
    });
  }

  // Sign out method
  function signOut() {
    if (user) {
      const cUser = userPool.getCurrentUser();
      console.log(cUser);
      if (cUser) cUser.signOut();
      localStorage.removeItem("idToken");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setUser(null);
    }
  }

  function getCurrentUser() {
    // const idToken = localStorage.getItem("idToken");
    // return idToken ? { idToken } : null;

    // Trial
    return new Promise((resolve, reject) => {
      const cognitoUser = userPool.getCurrentUser();
      if (cognitoUser) {
        cognitoUser.getSession((err, session) => {
          if (err) reject(err);
          else console.log(session);
        });
      } else {
        reject("No user is currently logged in");
      }
    });
  }

  function isAuthenticated() {
    return !!localStorage.getItem("idToken");
  }

  function getUserAttributes() {
    return new Promise((resolve, reject) => {
      const cognitoUser = userPool.getCurrentUser();
      if (cognitoUser) {
        cognitoUser.getSession((err, session) => {
          if (err) reject(err);
          else {
            cognitoUser.getUserAttributes((err, attributes) => {
              if (err) reject(err);
              else resolve(attributes);
            });
          }
        });
      } else {
        reject("No user is currently logged in");
      }
    });
  }

  return {
    user,
    error,
    signUp,
    verifyUser,
    signIn,
    signOut,

    initiatePasswordReset,
    confirmPasswordReset,

    getTokens,

    isAuthenticated,
    getUserAttributes,
    getCurrentUser,
  };
}

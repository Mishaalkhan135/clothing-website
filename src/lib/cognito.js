import {
    CognitoUserPool,
    CognitoUser,
    AuthenticationDetails,
  } from "amazon-cognito-identity-js";
  
  const poolData = {
    UserPoolId: "", // Replace with your actual User Pool ID
    ClientId: "", // Replace with your actual App Client ID
  };
  
  const userPool = new CognitoUserPool(poolData);
  
  export const signUp = (email, password, attributes) => {
    return new Promise((resolve, reject) => {
      const userAttributes = attributes.map(({ Name, Value }) => ({
        Name,
        Value,
      }));
  
      userPool.signUp(
        email,
        password,
        userAttributes,
        null,
        (err, result) => {
          if (err) {
            reject(err.message || JSON.stringify(err));
          } else {
            resolve(result.user);
          }
        }
      );
    });
  };
  
  export const signIn = (email, password) => {
    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });
  
    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
    });
  
    return new Promise((resolve, reject) => {
      user.authenticateUser(authDetails, {
        onSuccess: (result) => resolve(result),
        onFailure: (err) => reject(err.message || JSON.stringify(err)),
      });
    });
  };
  
  export const forgotPassword = (email) => {
    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
    });
  
    return new Promise((resolve, reject) => {
      user.forgotPassword({
        onSuccess: (data) => resolve(data),
        onFailure: (err) => reject(err.message || JSON.stringify(err)),
      });
    });
  };
  
  export const confirmPassword = (email, verificationCode, newPassword) => {
    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
    });
  
    return new Promise((resolve, reject) => {
      user.confirmPassword(verificationCode, newPassword, {
        onSuccess: () => resolve(),
        onFailure: (err) => reject(err.message || JSON.stringify(err)),
      });
    });
  };
  
  export const verifyEmail = (email, verificationCode) => {
    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
    });
  
    return new Promise((resolve, reject) => {
      user.confirmRegistration(verificationCode, true, (err, result) => {
        if (err) {
          reject(err.message || JSON.stringify(err));
        } else {
          resolve(result);
        }
      });
    });
  };
  
import { createContext, useContext, useEffect, useState } from "react";
import { useCognitoAuth } from "../hooks/useCognitoAuth";

const AccountContext = createContext();

function AccountProvider({ children }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState();

  const [message, setMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const { getUserAttributes, isAuthenticated, getCurrentUser, signOut } =
    useCognitoAuth();
  const [loggedIn, setLoggedIn] = useState(isAuthenticated);

  useEffect(() => {
    try {
      getCurrentUser();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated()) {
      getUserAttributes()
        .then((attrs) => {
          console.log(attrs[2].Value);
        })
        .catch((err) => {
          console.log(err.message);
          signOut().then((res) => console.log(res));
        });
    } else {
      console.log("User not authenticated");
    }
  }, []);

  function resetFields() {
    setEmail("");
    setPassword("");
    setVerificationCode("");
    setMessage("");
  }

  const value = {
    loggedIn,
    setLoggedIn,

    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    verificationCode,
    setVerificationCode,

    message,
    setMessage,

    isLoading,
    setIsLoading,

    resetFields,
  };

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
}

function useAccount() {
  const context = useContext(AccountContext);
  if (context === undefined)
    throw new Error("AccountContext was used outside the AccountProvider");
  return context;
}

export { AccountProvider, useAccount };

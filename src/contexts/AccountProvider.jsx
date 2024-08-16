import { createContext, useContext, useState } from "react";

const AccountContext = createContext();

function AccountProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const value = { loggedIn, setLoggedIn };

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

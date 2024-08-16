import { createContext, useContext, useState } from "react";

const PlateContext = createContext();

function PlateProvider({ children }) {
  const [totalItems, setTotalItems] = useState(0);
  const [plateItems, setPlateItems] = useState(new Map());
  const [totalPrice, setTotalPrice] = useState(0);

  const contextValue = {
    totalItems,
    setTotalItems,
    plateItems,
    setPlateItems,
    totalPrice,
    setTotalPrice,
  };

  return (
    <PlateContext.Provider value={contextValue}>
      {children}
    </PlateContext.Provider>
  );
}

function usePlate() {
  const context = useContext(PlateContext);
  if (context === undefined)
    throw new Error("PlateContext was used outside the PlateProvider");
  return context;
}

export { PlateProvider, usePlate };

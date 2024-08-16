import { usePlate } from "../contexts/PlateProvider";

// reducer.js
const initialState = {
  totalItems: 0,
  plateItems: {},
  totalPrice: 0,
};

function plateReducer(state, action) {
  switch (action.type) {
    case "SET_TOTAL_ITEMS":
      return { ...state, totalItems: action.payload };
    case "SET_PLATE_ITEMS":
      return { ...state, plateItems: action.payload };
    case "SET_TOTAL_PRICE":
      return { ...state, totalPrice: action.payload };
    default:
      return state;
  }
}

export { initialState, plateReducer };

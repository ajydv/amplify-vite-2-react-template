import { WarehouseState, Warehouse } from "./types";

const initialState: WarehouseState = {
  warehouses: [],
  activeWarehouse: null,
  loading: false,
};

type Action = 
  | { type: "SET_WAREHOUSES"; payload: Warehouse[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ACTIVE_WAREHOUSE"; payload: Warehouse | null };

const warehouseReducer = (state = initialState, action: Action): WarehouseState => {
  switch (action.type) {
    case "SET_WAREHOUSES":
      return {
        ...state,
        warehouses: action.payload,
        activeWarehouse: action.payload.length > 0 ? action.payload[0] : null,
        loading: false,
      };

    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    case "SET_ACTIVE_WAREHOUSE":
      return {
        ...state,
        activeWarehouse: action.payload,
      };

    default:
      return state;
  }
};

export default warehouseReducer;

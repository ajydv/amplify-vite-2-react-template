import { combineReducers } from "redux";
//import authReducer from "./auth/reducer";
import warehouseReducer from "./warehouse/reducer";

const rootReducer = combineReducers({
  //auth: authReducer,
  warehouse: warehouseReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

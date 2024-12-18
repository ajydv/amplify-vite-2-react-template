import { Warehouse } from "./types";

export const setWarehouses = (warehouses: Warehouse[]) => ({
  type: "SET_WAREHOUSES",
  payload: warehouses,
});

export const setLoading = (loading: boolean) => ({
  type: "SET_LOADING",
  payload: loading,
});

export const setActiveWarehouse = (warehouse: Warehouse | null) => ({
  type: "SET_ACTIVE_WAREHOUSE",
  payload: warehouse,
});

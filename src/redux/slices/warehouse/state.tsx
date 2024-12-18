export interface WarehouseState {
    warehouses: Array<{
      Warehouse_ID: number;
      Warehouse_Name: string;
      Created_Date: string;
    }>;
    activeWarehouse: {
      Warehouse_ID: number;
      Warehouse_Name: string;
      Created_Date: string;
    } | null;
    loading: boolean;
  }
  
  export const initialState: WarehouseState = {
    warehouses: [],
    activeWarehouse: null,
    loading: false,
  };
  
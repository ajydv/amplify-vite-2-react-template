export interface Warehouse {
    Warehouse_ID: number;
    Warehouse_Name: string;
    Created_Date: string;
  }
  
  export interface WarehouseState {
    warehouses: Warehouse[];
    activeWarehouse: Warehouse | null;
    loading: boolean;
  }
  
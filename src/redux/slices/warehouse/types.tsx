export interface Warehouse {
    Warehouse_ID: number;
    Warehouse_Name: string;
    Created_Date: string;
    Category_A_size:number;
    Category_B_size:number;
    Category_C_size:number;

  }
  
  export interface WarehouseState {
    warehouses: Warehouse[];
    activeWarehouse: Warehouse | null;
    loading: boolean;
  }
  
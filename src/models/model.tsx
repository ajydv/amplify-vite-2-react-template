export interface ApiResponse<T> {
    statusCode: number;
    data: T;
    message?: string;
  }

export interface WarehouseData{
  Warehouse_ID:Number,
  Warehouse_Name:String,
  Created_Date:String
}
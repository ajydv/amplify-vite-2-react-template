import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { getJWTToken } from "../services/jwtService";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

interface InventoryUploadModalProps {
  showModal: boolean;
  handleCloseModal: () => void;
  handleProceed: () => void;
}

const InventoryUploadModal: React.FC<InventoryUploadModalProps> = ({ showModal, handleCloseModal, handleProceed }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const { activeWarehouse } = useSelector(
    (state: RootState) => state.warehouse
  );

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  useEffect(()=>{
    resetForm()
  },[activeWarehouse]);

  useEffect(() => {
    resetForm()
  }, [showModal]);

  const resetForm = () => {
    console.log(`activeWarehouse`,activeWarehouse);
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleApiCall = async () => {
    if (!file) {
       alert("Please select a file before proceeding.");
       return;
     }
 
     setIsUploading(true);
 
     try {
       const { jwtToken } = await getJWTToken();
 
       const reader = new FileReader();
       reader.readAsDataURL(file);
       reader.onloadend = async () => {
         const base64File = reader.result?.toString().split(",")[1];
 
         if (!base64File) {
           alert("Error reading file");
           setIsUploading(false);
           return;
         }
 
         const formData = {
           bucket_name: 'test-inventory-files-bucket',
           file_name: file.name,
           file: base64File,
           Warehouse_ID: activeWarehouse?.Warehouse_ID,
           Warehouse_Name: activeWarehouse?.Warehouse_Name
         };
 
         const response = await axios.post(
           `https://hphhshrpva.execute-api.us-east-2.amazonaws.com/dev/aj-auth-test`,
           formData,
           {
             headers: {
               Authorization: `Bearer ${jwtToken}`,
               "Content-Type": "application/json",
             },
           }
         );
         setIsUploading(false);
         const responseData = response.data;
         if(responseData.statusCode==200){
           alert(responseData.message);
           setFile(null);
           handleProceed();
         }else{
            resetForm()
           alert(responseData.message)
         }
       };
     } catch (error) {
       console.error("Error uploading file:", error);
       setIsUploading(false);
       resetForm()
       alert("Error uploading file");
     }
   };

  return (
    <div
      className={`modal ${showModal ? "show" : ""}`}
      tabIndex={-1}
      style={{ display: showModal ? "block" : "none" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Step 3: Connect Inventory File</h5>
            <button type="button" className="btn-close" onClick={handleCloseModal}></button>
          </div>
          <div className="modal-body">
            <p>
              Please connect your inventory file below. File format should be Excel (.xlsx). The file columns will need to match exactly with the columns in the example file.
            </p>
            <div className="mb-3">
              <label htmlFor="fileUpload" className="form-label">
                Attachments
              </label>
              <input className="form-control" ref={fileInputRef} type="file" id="fileUpload" onChange={handleFileChange} />
            </div>
          </div>
          <div className="modal-footer">
           
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleApiCall}
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryUploadModal;

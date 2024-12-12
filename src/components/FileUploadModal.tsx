import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { getJWTToken } from "../services/jwtService";

interface FileUploadModalProps {
  showModal: boolean;
  handleCloseModal: () => void;
  handleProceed: () => void;
  activeWarehouse: { Warehouse_ID: Number, Warehouse_Name: String, Created_Date: String } | null;
  source: "inputInstance" | "uploadButton" | null;
}

const FileUploadModal: React.FC<FileUploadModalProps> = ({ showModal, handleCloseModal, handleProceed,activeWarehouse,source }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    const setPrevState =()=>{
      source === "inputInstance" ? console.log('source',source) : console.log(`activeWarehouse`,activeWarehouse);
      
      setFile(null);
    }
    setPrevState()
  }, [showModal]);

  const handleApiCall = async () => {
   if (!file) {
      alert("Please select a file before proceeding.");
      return;
    }

    setIsUploading(true);

    try {
      const jwtToken = await getJWTToken();

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
          bucket_name: 'test-parts-files-bucket',
          file_name: file.name,
          file: base64File,
          Warehouse_ID: activeWarehouse?.Warehouse_ID,
        };

        const response = await axios.post(
          `https://hphhshrpva.execute-api.us-east-2.amazonaws.com/dev/aj-auth-test`,
          JSON.stringify(formData),
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
          alert(responseData.message)
        }
      };
    } catch (error) {
      console.error("Error uploading file:", error);
      setIsUploading(false);
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
            <h5 className="modal-title">Step 2: Upload Parts File</h5>
            <button type="button" className="btn-close" onClick={handleCloseModal}></button>
          </div>
          <div className="modal-body">
            <p>
              Please upload your list of parts below. File format should be Excel (.xlsx). The file columns will need to match exactly with the columns in the example file.
            </p>
            <div className="mb-3">
              <label htmlFor="fileUpload" className="form-label">
                Attachments
              </label>
              <input className="form-control" type="file" id="fileUpload" onChange={handleFileChange} />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleCloseModal} disabled={isUploading}>
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleApiCall}
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Proceed to Next Step"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploadModal;

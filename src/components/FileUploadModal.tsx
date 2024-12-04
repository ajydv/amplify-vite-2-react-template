import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface FileUploadModalProps {
  showModal: boolean;
  handleCloseModal: () => void;
  handleProceed: () => void;
}

const FileUploadModal: React.FC<FileUploadModalProps> = ({ showModal, handleCloseModal, handleProceed }) => {
  return (
    <div className={`modal ${showModal ? "show" : ""}`} tabIndex={-1} style={{ display: showModal ? "block" : "none" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Step 2: Upload Parts File</h5>
            <button type="button" className="btn-close" onClick={handleCloseModal}></button>
          </div>
          <div className="modal-body">
            <p>Please upload your list of parts below. File format should be Excel (.xlsx). The file columns will need to match exactly with the columns in the example file.</p>
            <div className="mb-3">
              <label htmlFor="fileUpload" className="form-label">Attachments</label>
              <input className="form-control" type="file" id="fileUpload" />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={handleProceed}>
              Proceed to Next Step
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploadModal;

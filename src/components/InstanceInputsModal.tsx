import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface InstanceInputsModalProps {
  showModal: boolean;
  handleCloseModal: () => void;
  handleProceed: () => void; // Add the proceed handler as a prop
}

const InstanceInputsModal: React.FC<InstanceInputsModalProps> = ({ showModal, handleCloseModal, handleProceed }) => {
  return (
    <div className={`modal ${showModal ? "show" : ""}`} tabIndex={-1} style={{ display: showModal ? "block" : "none" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Step 1: Create Instance Initial Inputs</h5>
            <button type="button" className="btn-close" onClick={handleCloseModal}></button>
          </div>
          <div className="modal-body">
            <p className="text-center mb-4">The configurations made below will be for a one-year cycle counting term.</p>

            <form>
              {/* Instance Name */}
              <div className="mb-3">
                <label htmlFor="instanceName" className="form-label fw-bold">Instance Name:</label>
                <input type="text" className="form-control" id="instanceName" placeholder="Pharma Warehouse D14" defaultValue="Pharma Warehouse D14" />
              </div>

              {/* Sample Size */}
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <label htmlFor="sampleSize" className="form-label fw-bold mb-0">Sample Size:</label>
                  <span className="fw-bold text-primary">10%</span>
                </div>
                <input type="range" className="form-range" id="sampleSize" min="0" max="100" defaultValue="10" />
              </div>

              {/* Category Inputs */}
              <div className="row g-3">
                <div className="col-md-4">
                  <label htmlFor="categoryA" className="form-label fw-bold">Category A:</label>
                  <div className="input-group">
                    <input type="number" className="form-control" id="categoryA" defaultValue="20" />
                    <span className="input-group-text">%</span>
                  </div>
                  <small className="text-muted">(Top consumption)</small>
                </div>
                <div className="col-md-4">
                  <label htmlFor="categoryB" className="form-label fw-bold">Category B:</label>
                  <div className="input-group">
                    <input type="number" className="form-control" id="categoryB" defaultValue="30" />
                    <span className="input-group-text">%</span>
                  </div>
                  <small className="text-muted">(Middle consumption)</small>
                </div>
                <div className="col-md-4">
                  <label htmlFor="categoryC" className="form-label fw-bold">Category C:</label>
                  <div className="input-group">
                    <input type="number" className="form-control" id="categoryC" defaultValue="50" />
                    <span className="input-group-text">%</span>
                  </div>
                  <small className="text-muted">(Lowest consumption)</small>
                </div>
              </div>

              {/* Proceed Button */}
              <div className="text-center mt-4">
                <button type="button" className="btn btn-primary btn-lg" onClick={handleProceed}>
                  Proceed to Step 2
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstanceInputsModal;

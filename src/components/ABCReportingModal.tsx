import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface ABCReportingModalProps {
  showModal: boolean;
  handleCloseModal: () => void;
}

const ABCReportingModal: React.FC<ABCReportingModalProps> = ({ showModal, handleCloseModal }) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className={`modal fade ${showModal ? "show" : ""}`} tabIndex={-1} style={{ display: showModal ? "block" : "none" }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">ABC Reporting</h5>
            <button type="button" className="btn-close" onClick={handleCloseModal}></button>
          </div>
          <div className="modal-body" style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}>
            <div className="container">
              {/* Header Section */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="abcToggle"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor="abcToggle">
                      Flip toggle to see ABC Reporting
                    </label>
                  </div>
                </div>
                <button className="btn btn-danger" onClick={handleCloseModal}>
                  Done
                </button>
              </div>

              {/* Title and Description */}
              <h5 className="text-center fw-bold">ABC Categories Generated</h5>
              <p className="text-center text-muted">
                Below are the ABC categories generated. After clicking Done, you will be redirected to the home page where you can see the cycle counts generated.
              </p>

              {/* Table with scrollable container */}
              <div className="table-responsive" style={{ maxHeight: "400px", overflowY: "auto" }}>
                <table className="table table-bordered table-striped align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Part Number</th>
                      <th>Annual Units Sold</th>
                      <th>Cost per Unit</th>
                      <th>Annual Consumption Value</th>
                      <th>Consumption %</th>
                      <th>Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>EL0263</td>
                      <td>49054</td>
                      <td>$96.6</td>
                      <td>$4,738,616.4</td>
                      <td>0.36%</td>
                      <td><span className="badge bg-success">A</span></td>
                    </tr>
                    <tr>
                      <td>EL0808</td>
                      <td>49591</td>
                      <td>$93.7</td>
                      <td>$4,646,676.7</td>
                      <td>0.36%</td>
                      <td><span className="badge bg-success">A</span></td>
                    </tr>
                    <tr>
                      <td>EL0629</td>
                      <td>49960</td>
                      <td>$93</td>
                      <td>$4,646,280</td>
                      <td>0.36%</td>
                      <td><span className="badge bg-success">A</span></td>
                    </tr>
                    <tr>
                      <td>EL0773</td>
                      <td>45968</td>
                      <td>$99.2</td>
                      <td>$4,560,025.6</td>
                      <td>0.35%</td>
                      <td><span className="badge bg-success">A</span></td>
                    </tr>
                    <tr>
                      <td>EL0996</td>
                      <td>49954</td>
                      <td>$91.2</td>
                      <td>$4,555,804.8</td>
                      <td>0.35%</td>
                      <td><span className="badge bg-success">A</span></td>
                    </tr>
                    <tr>
                      <td>EL0068</td>
                      <td>48100</td>
                      <td>$94</td>
                      <td>$4,521,400</td>
                      <td>0.35%</td>
                      <td><span className="badge bg-success">A</span></td>
                    </tr>
                    <tr>
                      <td>EL0996</td>
                      <td>49954</td>
                      <td>$91.2</td>
                      <td>$4,555,804.8</td>
                      <td>0.35%</td>
                      <td><span className="badge bg-success">A</span></td>
                    </tr>
                    <tr>
                      <td>EL0068</td>
                      <td>48100</td>
                      <td>$94</td>
                      <td>$4,521,400</td>
                      <td>0.35%</td>
                      <td><span className="badge bg-success">A</span></td>
                    </tr>
                    <tr>
                      <td>EL0996</td>
                      <td>49954</td>
                      <td>$91.2</td>
                      <td>$4,555,804.8</td>
                      <td>0.35%</td>
                      <td><span className="badge bg-success">A</span></td>
                    </tr>
                    <tr>
                      <td>EL0068</td>
                      <td>48100</td>
                      <td>$94</td>
                      <td>$4,521,400</td>
                      <td>0.35%</td>
                      <td><span className="badge bg-success">A</span></td>
                    </tr>
                    <tr>
                      <td>EL0996</td>
                      <td>49954</td>
                      <td>$91.2</td>
                      <td>$4,555,804.8</td>
                      <td>0.35%</td>
                      <td><span className="badge bg-success">A</span></td>
                    </tr>
                    <tr>
                      <td>EL0068</td>
                      <td>48100</td>
                      <td>$94</td>
                      <td>$4,521,400</td>
                      <td>0.35%</td>
                      <td><span className="badge bg-success">A</span></td>
                    </tr>
                    <tr>
                      <td>EL0996</td>
                      <td>49954</td>
                      <td>$91.2</td>
                      <td>$4,555,804.8</td>
                      <td>0.35%</td>
                      <td><span className="badge bg-success">A</span></td>
                    </tr>
                    <tr>
                      <td>EL0068</td>
                      <td>48100</td>
                      <td>$94</td>
                      <td>$4,521,400</td>
                      <td>0.35%</td>
                      <td><span className="badge bg-success">A</span></td>
                    </tr>
                    <tr>
                      <td>EL0996</td>
                      <td>49954</td>
                      <td>$91.2</td>
                      <td>$4,555,804.8</td>
                      <td>0.35%</td>
                      <td><span className="badge bg-success">A</span></td>
                    </tr>
                    <tr>
                      <td>EL0068</td>
                      <td>48100</td>
                      <td>$94</td>
                      <td>$4,521,400</td>
                      <td>0.35%</td>
                      <td><span className="badge bg-success">A</span></td>
                    </tr>
                    <tr>
                      <td>EL0996</td>
                      <td>49954</td>
                      <td>$91.2</td>
                      <td>$4,555,804.8</td>
                      <td>0.35%</td>
                      <td><span className="badge bg-success">A</span></td>
                    </tr>
                    <tr>
                      <td>EL0068</td>
                      <td>48100</td>
                      <td>$94</td>
                      <td>$4,521,400</td>
                      <td>0.35%</td>
                      <td><span className="badge bg-success">A</span></td>
                    </tr>
                    <tr>
                      <td>EL0996</td>
                      <td>49954</td>
                      <td>$91.2</td>
                      <td>$4,555,804.8</td>
                      <td>0.35%</td>
                      <td><span className="badge bg-success">A</span></td>
                    </tr>
                    <tr>
                      <td>EL0068</td>
                      <td>48100</td>
                      <td>$94</td>
                      <td>$4,521,400</td>
                      <td>0.35%</td>
                      <td><span className="badge bg-success">A</span></td>
                    </tr>
                    <tr>
                      <td>EL0996</td>
                      <td>49954</td>
                      <td>$91.2</td>
                      <td>$4,555,804.8</td>
                      <td>0.35%</td>
                      <td><span className="badge bg-success">A</span></td>
                    </tr>
                    <tr>
                      <td>EL0068</td>
                      <td>48100</td>
                      <td>$94</td>
                      <td>$4,521,400</td>
                      <td>0.35%</td>
                      <td><span className="badge bg-success">A</span></td>
                    </tr>
                    <tr>
                      <td>EL0996</td>
                      <td>49954</td>
                      <td>$91.2</td>
                      <td>$4,555,804.8</td>
                      <td>0.35%</td>
                      <td><span className="badge bg-success">A</span></td>
                    </tr>
                    <tr>
                      <td>EL0068</td>
                      <td>48100</td>
                      <td>$94</td>
                      <td>$4,521,400</td>
                      <td>0.35%</td>
                      <td><span className="badge bg-success">A</span></td>
                    </tr>
                    <tr>
                      <td>EL0996</td>
                      <td>49954</td>
                      <td>$91.2</td>
                      <td>$4,555,804.8</td>
                      <td>0.35%</td>
                      <td><span className="badge bg-success">A</span></td>
                    </tr>
                    <tr>
                      <td>EL0068</td>
                      <td>48100</td>
                      <td>$94</td>
                      <td>$4,521,400</td>
                      <td>0.35%</td>
                      <td><span className="badge bg-success">A</span></td>
                    </tr>
                    <tr>
                      <td>EL0996</td>
                      <td>49954</td>
                      <td>$91.2</td>
                      <td>$4,555,804.8</td>
                      <td>0.35%</td>
                      <td><span className="badge bg-success">A</span></td>
                    </tr>
                    <tr>
                      <td>EL0068</td>
                      <td>48100</td>
                      <td>$94</td>
                      <td>$4,521,400</td>
                      <td>0.35%</td>
                      <td><span className="badge bg-success">A</span></td>
                    </tr>
                    <tr>
                      <td>EL0996</td>
                      <td>49954</td>
                      <td>$91.2</td>
                      <td>$4,555,804.8</td>
                      <td>0.35%</td>
                      <td><span className="badge bg-success">A</span></td>
                    </tr>
                    <tr>
                      <td>EL0068</td>
                      <td>48100</td>
                      <td>$94</td>
                      <td>$4,521,400</td>
                      <td>0.35%</td>
                      <td><span className="badge bg-success">A</span></td>
                    </tr>
                    {/* Add other rows as needed */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ABCReportingModal;

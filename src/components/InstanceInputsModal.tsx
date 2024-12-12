import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { getJWTToken,getUserLoginId } from "../services/jwtService";

interface InstanceInputsModalProps {
  showModal: boolean;
  handleCloseModal: () => void;
  handleProceed: () => void;
  onInstanceCreated: () => void;
}

const InstanceInputsModal: React.FC<InstanceInputsModalProps> = ({ showModal, handleCloseModal, handleProceed,onInstanceCreated }) => {
  const [Warehouse_Name, setWarehouse_Name] = useState("");
  const [Sample_size, setSample_size] = useState(10);
  const [Category_A_size, setCategory_A_size] = useState(20);
  const [Category_B_size, setCategory_B_size] = useState(30);
  const [Category_C_size, setCategory_C_size] = useState(50);
  const [Weighted_Cost_Percentage, setWeighted_Cost_Percentage] = useState(50);
  const [Weighted_Consumption_Percentage, setWeighted_Consumption_Percentage] = useState(50);
  const [isLoading, setIsLoading] = useState(false);
  const user = getUserLoginId();

  useEffect(() => {
    const setPrevState=()=>{
      setWarehouse_Name("")
      setSample_size(10)
      setCategory_A_size(20)
      setCategory_B_size(30)
      setCategory_C_size(50)
      setWeighted_Cost_Percentage(50)
      setWeighted_Consumption_Percentage(50)

    }
    setPrevState()
  }, [showModal]);

  const handleSubmit = async()=>{
    if (!Warehouse_Name.trim()) {
      alert("Instance Name is required.");
      return;
    }
    if (Category_A_size + Category_B_size + Category_C_size !== 100) {
      alert("Category percentages must add up to 100%.");
      return;
    }
    setIsLoading(true);
    try {
      const jwtToken = await getJWTToken();
    
      if (!jwtToken) {
        alert("Unable to retrieve JWT token.");
        return;
      }
      const Created_By = user;

      const formData = {
        "resource_name": "ProcWarehouseInstances",
          "data": {
            'action':'insert',
            Warehouse_Name,
            Sample_size,
            Category_A_size,
            Category_B_size,
            Category_C_size,
            Weighted_Cost_Percentage,
            Weighted_Consumption_Percentage,
            'Is_Active':1,
            Created_By
          }
        }
      console.log(`formData`,formData);
      
      const response = await axios.post("https://hphhshrpva.execute-api.us-east-2.amazonaws.com/dev/add-data",
        JSON.stringify(formData),
        {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      
      if (response.status === 200) {
        const responseData = response.data;
        if(responseData.statusCode===200){
          alert(`API Response: ${responseData.message}`);
          setIsLoading(false);
          handleCloseModal();
          onInstanceCreated();
          handleProceed();
        }else{
          alert(`API Response: ${responseData.message}`);
          setIsLoading(false);
        }
        
      } else {
        alert("Failed to submit instance. Please try again.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("API call error:", error);
      alert("An error occurred while submitting. Please try again.");
      setIsLoading(false);
    }
    
  };
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
                <label htmlFor="Warehouse_Name" className="form-label fw-bold">Instance Name:</label>
                <input type="text" className="form-control" id="Warehouse_Name" placeholder="Instance Name" value={Warehouse_Name}
                  onChange={(e) => setWarehouse_Name(e.target.value)} />
              </div>

              {/* Sample Size */}
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <label htmlFor="Sample_size" className="form-label fw-bold mb-0">Sample Size:</label>
                  <span className="fw-bold text-primary">{Sample_size}%</span>
                </div>
                <input type="range" className="form-range" id="Sample_size" min="0" max="100" value={Sample_size}
                  onChange={(e) => setSample_size(Number(e.target.value))} />
              </div>

              {/* Category Inputs */}
              <div className="row g-3">
                <div className="col-md-4">
                  <label htmlFor="Category_A_size" className="form-label fw-bold">Category A:</label>
                  <div className="input-group">
                    <input type="number" className="form-control" id="Category_A_size" value={Category_A_size}
                      onChange={(e) => setCategory_A_size(Number(e.target.value))}/>
                    <span className="input-group-text">%</span>
                  </div>
                  <small className="text-muted">(Top consumption)</small>
                </div>
                <div className="col-md-4">
                  <label htmlFor="Category_B_size" className="form-label fw-bold">Category B:</label>
                  <div className="input-group">
                    <input type="number" className="form-control" id="Category_B_size" value={Category_B_size}
                      onChange={(e) => setCategory_B_size(Number(e.target.value))} />
                    <span className="input-group-text">%</span>
                  </div>
                  <small className="text-muted">(Middle consumption)</small>
                </div>
                <div className="col-md-4">
                  <label htmlFor="Category_C_size" className="form-label fw-bold">Category C:</label>
                  <div className="input-group">
                    <input type="number" className="form-control" id="Category_C_size" value={Category_C_size}
                      onChange={(e) => setCategory_C_size(Number(e.target.value))} />
                    <span className="input-group-text">%</span>
                  </div>
                  <small className="text-muted">(Lowest consumption)</small>
                </div>
              </div>
              <div className="row g-3">
              <div className="col-md-5">
                  <label htmlFor="Weighted_Cost_Percentage" className="form-label fw-bold">Weighted Cost Percentage:</label>
                  <div className="input-group">
                    <input type="number" className="form-control" id="Weighted_Cost_Percentage" value={Weighted_Cost_Percentage}
                      onChange={(e) => setWeighted_Cost_Percentage(Number(e.target.value))} />
                    <span className="input-group-text">%</span>
                  </div>
                </div>
                <div className="col-md-5">
                  <label htmlFor="Weighted_Consumption_Percentage" className="form-label fw-bold">Weighted Consumption Percentage:</label>
                  <div className="input-group">
                    <input type="number" className="form-control" id="Weighted_Consumption_Percentage" value={Weighted_Consumption_Percentage}
                      onChange={(e) => setWeighted_Consumption_Percentage(Number(e.target.value))} />
                    <span className="input-group-text">%</span>
                  </div>
                </div>
              </div>
              {/* Proceed Button */}
              <div className="text-center mt-4">
                <button type="button" className="btn btn-primary btn-lg" onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Proceed to Step 2"}
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

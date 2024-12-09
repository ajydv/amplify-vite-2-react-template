import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { getJWTToken } from "../services/jwtService";

interface InstanceInputsModalProps {
  showModal: boolean;
  handleCloseModal: () => void;
  handleProceed: () => void;
}

const InstanceInputsModal: React.FC<InstanceInputsModalProps> = ({ showModal, handleCloseModal, handleProceed }) => {
  const [WarehouseName, setWarehouseName] = useState("");
  const [SampleSize, setSampleSize] = useState(0);
  const [CategoryASize, setCategoryASize] = useState(0);
  const [CategoryBSize, setCategoryBSize] = useState(0);
  const [CategoryCSize, setCategoryCSize] = useState(0);
  const [WeightedCostPercentage, setWeightedCostPercentage] = useState(0);
  const [WeightedConsumptionPercentage, setWeightedConsumptionPercentage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (!showModal) return;
    const fetchInitialData = async () => {
      const token = await getJWTToken();
      console.log(token);
      if (!token) {
        console.error("Token is required");
        setIsFetching(false);
        return;
      }
      setIsFetching(true);
      const formData = {
        'resource_name':'WarehouseInventoryView',
        'condition':''
      };
      try {
        const response = await axios.post("https://hphhshrpva.execute-api.us-east-2.amazonaws.com/dev/get-data", 
          JSON.stringify(formData),
          {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        const responseData = response.data;
        if(responseData.statusCode==200){
          const warehouseInvData = responseData.data[0]
          console.log('warehouseInvData',warehouseInvData);
          setWarehouseName(warehouseInvData.WarehouseName || "Pharma Warehouse D");
          setSampleSize(warehouseInvData.SampleSize || 1);
          setCategoryASize(warehouseInvData.CategoryASizeSize || 20);
          setCategoryBSize(warehouseInvData.CategoryBSize || 30);
          setCategoryCSize(warehouseInvData.CategoryCSize || 50);
          setWeightedCostPercentage(warehouseInvData.WeightedCostPercentage || 50);
          setWeightedConsumptionPercentage(warehouseInvData.WeightedConsumptionPercentage || 50);
          setIsFetching(false);
        }
        // else if(data.statusCode==204){
        //   setInstanceName(data.instanceName || "Pharma Warehouse D14");
        //   setSampleSize(data.SampleSize || 10);
        //   setCategoryASizeSize(data.CategoryASize || 20);
        //   setCategoryBSize(data.CategoryBSize || 30);
        //   setCategoryCSize(data.CategoryCSize || 50);
        //   setIsFetching(false);
        // }
        

        
      } catch (error) {
        console.error("Error fetching initial data:", error);
        alert("Failed to fetch initial data. Please try again.");
        setIsFetching(false);
      }
    };

    fetchInitialData();
  }, [showModal]);

  const handleSubmit = async()=>{
    if (!WarehouseName.trim()) {
      alert("Instance Name is required.");
      return;
    }
    if (CategoryASize + CategoryBSize + CategoryCSize !== 100) {
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
      const response = await axios.post("", {
        WarehouseName,
        SampleSize,
        categories: { A: CategoryASize, B: CategoryBSize, C: CategoryCSize },
      });

      if (response.status === 200) {
        const data = response.data;
        alert(`API Response: ${data.message}`);
        setIsLoading(false);
        handleCloseModal();
        handleProceed();
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
  if (isFetching) {
    return (
      <div
        className={`modal ${showModal ? "show" : ""}`}
        tabIndex={-1}
        style={{ display: showModal ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Loading...</h5>
            </div>
            <div className="modal-body">
              <p className="text-center mb-4">Fetching the initial data...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
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
                <label htmlFor="WarehouseName" className="form-label fw-bold">Instance Name:</label>
                <input type="text" className="form-control" id="WarehouseName" placeholder="Instance Name" value={WarehouseName}
                  onChange={(e) => setWarehouseName(e.target.value)} />
              </div>

              {/* Sample Size */}
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <label htmlFor="SampleSize" className="form-label fw-bold mb-0">Sample Size:</label>
                  <span className="fw-bold text-primary">{SampleSize}%</span>
                </div>
                <input type="range" className="form-range" id="SampleSize" min="0" max="100" value={SampleSize}
                  onChange={(e) => setSampleSize(Number(e.target.value))} />
              </div>

              {/* Category Inputs */}
              <div className="row g-3">
                <div className="col-md-4">
                  <label htmlFor="CategoryASize" className="form-label fw-bold">Category A:</label>
                  <div className="input-group">
                    <input type="number" className="form-control" id="CategoryASize" value={CategoryASize}
                      onChange={(e) => setCategoryASize(Number(e.target.value))}/>
                    <span className="input-group-text">%</span>
                  </div>
                  <small className="text-muted">(Top consumption)</small>
                </div>
                <div className="col-md-4">
                  <label htmlFor="CategoryBSize" className="form-label fw-bold">Category B:</label>
                  <div className="input-group">
                    <input type="number" className="form-control" id="CategoryBSize" value={CategoryBSize}
                      onChange={(e) => setCategoryBSize(Number(e.target.value))} />
                    <span className="input-group-text">%</span>
                  </div>
                  <small className="text-muted">(Middle consumption)</small>
                </div>
                <div className="col-md-4">
                  <label htmlFor="CategoryCSize" className="form-label fw-bold">Category C:</label>
                  <div className="input-group">
                    <input type="number" className="form-control" id="CategoryCSize" value={CategoryCSize}
                      onChange={(e) => setCategoryCSize(Number(e.target.value))} />
                    <span className="input-group-text">%</span>
                  </div>
                  <small className="text-muted">(Lowest consumption)</small>
                </div>
              </div>
              <div className="row g-3">
              <div className="col-md-5">
                  <label htmlFor="WeightedCostPercentage" className="form-label fw-bold">Weighted Cost Percentage:</label>
                  <div className="input-group">
                    <input type="number" className="form-control" id="WeightedCostPercentage" value={WeightedCostPercentage}
                      onChange={(e) => setWeightedCostPercentage(Number(e.target.value))} />
                    <span className="input-group-text">%</span>
                  </div>
                </div>
                <div className="col-md-5">
                  <label htmlFor="WeightedConsumptionPercentage" className="form-label fw-bold">Weighted Consumption Percentage:</label>
                  <div className="input-group">
                    <input type="number" className="form-control" id="WeightedConsumptionPercentage" value={WeightedConsumptionPercentage}
                      onChange={(e) => setWeightedConsumptionPercentage(Number(e.target.value))} />
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

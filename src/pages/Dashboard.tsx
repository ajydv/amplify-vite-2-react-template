import React,{useEffect, useState} from "react";
import FileUploadModal from "../components/FileUploadModal";
import InstanceInputsModal from "../components/InstanceInputsModal";
import ABCReportingModal from "../components/ABCReportingModal";
import {useNavigate } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import axios from "axios";
import { getJWTToken,getUserLoginId } from "../services/jwtService";


const Dashboard: React.FC = () => {
  const { signOut } = useAuthenticator();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [sideLoading, setSideLoading] = useState(true);
  const [showFileUploadModal, setShowFileUploadModal] = useState<boolean>(false);
  const [showInstanceInputsModal, setShowInstanceInputsModal] = useState<boolean>(false);
  const [showABCReportingModal, setShowABCReportingModal] = useState<boolean>(false); 

  useEffect(()=>{
    fetchWarehouses();
  },[])

  const handleShowFileUploadModal = () => {
    setShowFileUploadModal(true);
    setSource("inputInstance");
    setShowInstanceInputsModal(false);
  }
  const handleCloseFileUploadModal = () => setShowFileUploadModal(false);

  const handleShowABCReportingModal = () => {
    setShowFileUploadModal(false);  
    setShowABCReportingModal(true);
  };
  const handleShowInstanceInputsModal = () => {
    setShowInstanceInputsModal(true);
  };
  const handleCloseInstanceInputsModal = () => setShowInstanceInputsModal(false);

  const handleCloseABCReportingModal = () => setShowABCReportingModal(false);
  const [source, setSource] = useState<"inputInstance" | "uploadButton" | null>(null);
  const [warehouses, setWarehouses] = useState<Array<{Warehouse_ID:Number,Warehouse_Name:String,Created_Date:String}>>([]);
  const [activeWarehouse, setActiveWarehouse] = useState<{ Warehouse_ID: Number, Warehouse_Name: String, Created_Date: String } | null>(null);

  const fetchWarehouses=async()=>{
    const token = await getJWTToken();
    const formData = {
      'resource_name':'WarehouseInstancesView',
      'condition':''
    };
    try{
      const response = await axios.post("https://hphhshrpva.execute-api.us-east-2.amazonaws.com/dev/get-data", 
        JSON.stringify(formData),
        {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = response.data;
      if(responseData.statusCode==200){
        setWarehouses([]);
        setWarehouses(responseData.data);
        setSideLoading(false)
        if (responseData.data.length > 0) {
          const defaultWarehouse = responseData.data[0];
          setActiveWarehouse(defaultWarehouse);
          setActiveIndex(0);
        }
      }
    }catch (error) {
      console.error("Error fetching warehouse data:", error);
    }
  };

  const handleActiveClick = (index:number) => {
    setActiveIndex(index);
    const selectedWarehouse = warehouses[index];
    setActiveWarehouse(selectedWarehouse);
  };

  const refreshWarehouses = () => {
    setSideLoading(true)
    fetchWarehouses();
  };
  const handleOpenFileUploadDirectly = () => {
    setSource("uploadButton");
    setShowFileUploadModal(true);
  };
  return (
    <div className="container-fluid position-relative">
  <header className="row bg-primary text-white py-3 px-4">
    <div className="col-md-6 d-flex align-items-center">
      <h5>Welcome, {getUserLoginId()}</h5>
    </div>
    <div className="col-md-6 d-flex text-end">
      <div className="col-md-8">
        <button className="btn btn-light" onClick={handleShowInstanceInputsModal}>
          Create New Cycle Counting Instance
        </button>
      </div>
      <div className="col-md-3">
        <button className="btn btn-danger" onClick={signOut}>
          Sign Out
        </button>
      </div>
    </div>
  </header>
  {showFileUploadModal || showInstanceInputsModal || showABCReportingModal ? (
        <div className="modal-backdrop fade show"></div>
      ) : null}
      {/* InstanceInputsModal */}
      <InstanceInputsModal
              showModal={showInstanceInputsModal}
              handleCloseModal={handleCloseInstanceInputsModal}
              handleProceed={handleShowFileUploadModal}
              onInstanceCreated={refreshWarehouses}
            />

      {/* FileUploadModal */}
      <FileUploadModal 
        showModal={showFileUploadModal} 
        handleCloseModal={handleCloseFileUploadModal} 
        handleProceed={handleShowABCReportingModal}
        activeWarehouse={activeWarehouse}
        source={source}
      />

      {/* ABCReportingModal */}
      <ABCReportingModal 
        showModal={showABCReportingModal} 
        handleCloseModal={handleCloseABCReportingModal} 
      />
  <div className="row mt-4">
      <aside className="col-lg-3 col-md-4 mb-4 position-relative" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
      {sideLoading ? (
            <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
          ) : (
            warehouses.map((warehouse, index) => (
              <div
                key={index}
                className={`card position-relative z-index-1 ${index > 0  ? "mt-3" : ""} ${
                  activeIndex === index ? "active-item" : ""
                }`}
                onClick={() => handleActiveClick(index)}
                style={{
                  cursor: "pointer",
                  border: activeIndex === index ? "2px solid #007bff" : "",
                }}
              >
                <div className="card-body">
                  <h5 className="card-title">
                    {warehouse.Warehouse_Name}{" "}
                    {activeIndex === index && (
                      <span className="badge bg-success p-1 fs-6 ms-2">Active</span>
                    )}
                  </h5>
                  <p className="card-subtitle text-muted">
                    Created {warehouse.Created_Date}
                  </p>
                </div>
              </div>
            ))
          )}
        </aside>

    <main className="col-lg-9 col-md-8 position-relative">
      <div className="card position-absolute top-0 start-0 w-100 h-100 bg-light z-index-0">
        <div className="card-body"></div>
      </div>
      <div className="row mb-4 position-relative z-index-1">
        <h4 className="mb-3 mt-4">Total Inventory Overview</h4>
        <div className="col-md-4 mb-3">
          <button className="btn btn-primary w-100 rounded-pill" onClick={handleOpenFileUploadDirectly}>
            Upload Parts File
          </button>
        </div>
        <div className="col-md-4 mb-3">
              <button className="btn btn-warning w-100 rounded-pill">
                Timeseries: Inventory vs. Actual Counts
              </button>
            </div>
        <div className="col-md-4 mb-3">
          <button
            className="btn btn-success w-100 rounded-pill"
            onClick={() => navigate('/dailycount')}>
            Go to Today's Count
          </button>
        </div>
      </div>
      <div className="row mb-4 position-relative z-index-1">
        <div className="col-md-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">Part Numbers</h6>
              <p>1012</p>
              <button className="btn btn-primary btn-sm w-100">
                View Product List
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">Last Count Completed</h6>
              <p>N/A</p>
              <button className="btn btn-primary btn-sm w-100">
                See Counted Items
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">Today's Count</h6>
              <p>10 part numbers - 528 parts</p>
              <button className="btn btn-primary btn-sm w-100">
                See Today's Count
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row position-relative z-index-1">
        <div className="col-md-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">ABC Categorization</h6>
              <p>
                A: 66 part numbers (Top 20%)
                <br />
                B: 146 part numbers (Next 30%)
                <br />
                C: 800 part numbers (Last 50%)
              </p>
              <button className="btn btn-primary btn-sm w-100">
                See ABC Categories
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">Total Inventory</h6>
              <p>
                9324 Items
                <br />
                Batches in Production: 2
                <br />
                Raw Materials: 6083
              </p>
              <button className="btn btn-primary btn-sm w-100">
                Warehouse Inventory
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">Forecasted Count</h6>
              <p>
                Tomorrow - 202 parts
                <br />
                10/19/2024 - 264 parts
                <br />
                10/20/2024 - 297 parts
              </p>
              <button className="btn btn-primary btn-sm w-100">
                See Calendar
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>

  {/* <footer className="row bg-warning text-white py-3 text-center">
    <p>&copy; 2024 Your Company Name. All rights reserved.</p>
  </footer> */}
</div>

  );
};

export default Dashboard;

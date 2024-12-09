import React,{useEffect, useState} from "react";
import FileUploadModal from "../components/FileUploadModal";
import InstanceInputsModal from "../components/InstanceInputsModal";
import ABCReportingModal from "../components/ABCReportingModal";
import {useNavigate } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import axios from "axios";
import { getJWTToken } from "../services/jwtService";

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuthenticator();
  const navigate = useNavigate();
  const [showFileUploadModal, setShowFileUploadModal] = useState<boolean>(false);
  const [showInstanceInputsModal, setShowInstanceInputsModal] = useState<boolean>(false);
  const [showABCReportingModal, setShowABCReportingModal] = useState<boolean>(false); 

  const handleShowFileUploadModal = () => setShowFileUploadModal(true);
  const handleCloseFileUploadModal = () => setShowFileUploadModal(false);

  const handleShowABCReportingModal = () => {
    setShowInstanceInputsModal(false);  
    setShowABCReportingModal(true);
  };
  const handleShowInstanceInputsModal = () => {
    setShowFileUploadModal(false); 
    setShowInstanceInputsModal(true);
  };
  const handleCloseInstanceInputsModal = () => setShowInstanceInputsModal(false);

  const handleCloseABCReportingModal = () => setShowABCReportingModal(false);

  const [warehouses, setWarehouses] = useState<Array<{WarehouseID:Number,WarehouseName:String,CreatedDate:String}>>([]);

  useEffect(()=>{
    const fetchWarehouses=async()=>{
      const token = await getJWTToken();
      const formData = {
        'resource_name':'Warehouse',
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
          setWarehouses(responseData.data);
        }
      }catch (error) {
        console.error("Error fetching warehouse data:", error);
      }
    };
    fetchWarehouses();
  },[])
  return (
    <div className="container-fluid position-relative">
      <div className="row bg-primary text-white py-3 px-4">
        <div className="col-md-6 d-flex align-items-center">
          <h5>Welcome, {user?.signInDetails?.loginId}</h5>
        </div>
        <div className="col-md-6 d-flex text-end">
            <div className="col-md-8">
            <button className="btn btn-light" onClick={handleShowFileUploadModal}>Create New Cycle Counting Instance</button>
            </div>
            <div className="col-md-3">
            <button className="btn btn-danger" onClick={signOut}>Sign Out</button>
            </div>
        </div>
      </div>

      {showFileUploadModal || showInstanceInputsModal || showABCReportingModal ? (
        <div className="modal-backdrop fade show"></div>
      ) : null}
      {/* FileUploadModal */}
      <FileUploadModal 
        showModal={showFileUploadModal} 
        handleCloseModal={handleCloseFileUploadModal} 
        handleProceed={handleShowInstanceInputsModal} 
      />

      {/* InstanceInputsModal */}
      <InstanceInputsModal
        showModal={showInstanceInputsModal}
        handleCloseModal={handleCloseInstanceInputsModal}
        handleProceed={handleShowABCReportingModal}
      />

      {/* ABCReportingModal */}
      <ABCReportingModal 
        showModal={showABCReportingModal} 
        handleCloseModal={handleCloseABCReportingModal} 
      />
      <div className="row mt-4">
        <div className="col-lg-3 col-md-4 mb-4 position-relative">
        {warehouses.map((warehouse, index) => (
            <div className="card position-relative z-index-1 mt-3" key={index}>
              <div className="card-body">
                <h5 className="card-title">
                  {warehouse.WarehouseName} <span className="badge bg-success p-1 fs-6">Active</span>
                </h5>
                <p className="card-subtitle text-muted">Created {warehouse.CreatedDate}</p>
                {/* <p className="text-warning">{String(warehouse.WarehouseID)} products</p> */}
              </div>
            </div>
          ))}

        </div>

        <div className="col-lg-9 col-md-8 position-relative">
          <div className="card position-absolute top-0 start-0 w-100 h-100 bg-light z-index-0">
            <div className="card-body"></div>
          </div>
          
          <div className="row mb-4 position-relative z-index-1">
          <h4 className="mb-3 mt-4">Total Inventory Overview</h4>
            <div className="col-md-6 mb-3">
              <button className="btn btn-warning w-100 rounded-pill">
                Timeseries: Inventory vs. Actual Counts
              </button>
            </div>
            <div className="col-md-6 mb-3">
              <button className="btn btn-success w-100 rounded-pill" onClick={()=>navigate('/dailycount')}>
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

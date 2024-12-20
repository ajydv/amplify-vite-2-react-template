import React, { useEffect, useRef, useState } from "react";
import FileUploadModal from "../components/FileUploadModal";
import InstanceInputsModal from "../components/InstanceInputsModal";
import ABCReportingModal from "../components/ABCReportingModal";
import { useNavigate } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { setWarehouses, setLoading, setActiveWarehouse } from "../redux/slices/warehouse/actions";
import { apiPost } from "../services/apiService";
import InventoryUploadModal from "../components/InventoryUploadModal";

interface DashboardData {
  A: number;
  B: number;
  C: number;
  Total_Parts: number;
}

const Dashboard: React.FC = () => {
  const { signOut } = useAuthenticator();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { warehouses, activeWarehouse, loading } = useSelector(
    (state: RootState) => state.warehouse
  );
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showFileUploadModal, setShowFileUploadModal] = useState(false);
  const [showInventoryUploadModal, setShowInventoryUploadModal] = useState(false);
  const [showInstanceInputsModal, setShowInstanceInputsModal] = useState(false);
  const [showABCReportingModal, setShowABCReportingModal] = useState(false);
  const [source, setSource] = useState<"inputInstance" | "uploadButton" | null>(null);

  const sidePanelRef = useRef<HTMLDivElement | null>(null);
  //const warehouseRefs = useRef<(HTMLDivElement | null)[]>([]);

  const getdashboardData = async () => {
    if (!activeWarehouse) return;
    setLoading(true);
    const formData = {
      resource_name: "DashboardDataView",
      condition: `Warehouse_ID=${activeWarehouse.Warehouse_ID}`,
    };
    try {
      const response = await apiPost("/get-data", formData);
      if (response.data.statusCode === 200) {
        setDashboardData(response.data.data[0] || null);
      } else {
        setDashboardData(null);
        console.error("Error: Invalid response", response.data);
      }
    } catch (error) {
      console.error("Error fetching Categorization data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWarehouses();
  }, []);

  useEffect(() => {
    getdashboardData();
  }, [activeWarehouse]);

  useEffect(() => {
    if (sidePanelRef.current && activeIndex >= 0) {
      const cardHeight = 85;
      const scrollPosition = activeIndex * cardHeight;
      sidePanelRef.current.scrollTop = scrollPosition;
    }
  }, [activeIndex]);

  const fetchWarehouses = async (val:String='') => {
    console.log(`source`,source)
    dispatch(setLoading(true));
    const formData = { resource_name: "WarehouseInstancesView", condition: "" };
    try {
      const response = await apiPost("/get-data", formData);
      if (response.data.statusCode === 200) {
        dispatch(setWarehouses(response.data.data));
        if (response.data.data.length > 0 && !activeWarehouse) {
          dispatch(setActiveWarehouse(response.data.data[0]));
          setActiveIndex(0);
        }
        else if (activeWarehouse) {
          const prevIndex = response.data.data.findIndex(
            (w: any) => w.Warehouse_ID === activeWarehouse.Warehouse_ID
          );
          if(val==="fromInput"){
            setActiveIndex(0);
            dispatch(setActiveWarehouse(response.data.data[0]));
          }else{
            setActiveIndex(prevIndex >= 0 ? prevIndex : 0);
            dispatch(setActiveWarehouse(response.data.data[prevIndex >= 0 ? prevIndex : 0]));
          }
        }
      }else{
        dispatch(setWarehouses([]));
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.error("Error fetching warehouse data:", error);
      dispatch(setLoading(false));
    }
  };

  const handleActiveClick = (index: number) => {
    setActiveIndex(index);
    const selectedWarehouse = warehouses[index];
    dispatch(setActiveWarehouse(selectedWarehouse));
  };

  const handleShowFileUploadModal = () => {
    setShowFileUploadModal(true);
    setSource("inputInstance");
    setShowInstanceInputsModal(false);
  };
  const dashboarUploadPart = () => {
    setShowFileUploadModal(true);
    setSource("uploadButton");
    setShowInstanceInputsModal(false);
  };

  const handleCloseFileUploadModal = () =>{ setShowFileUploadModal(false);}
  const handleCloseInstanceInputsModal = () => setShowInstanceInputsModal(false);
  const handleCloseABCReportingModal = () => {setShowABCReportingModal(false);getdashboardData()};
  const handleCloseInventoryUploadModal = () =>{ setShowInventoryUploadModal(false);}

  const handleABCModel=()=>{
    setShowFileUploadModal(false);
    setShowABCReportingModal(true)
  }
  const refreshWarehouses = () => {
    fetchWarehouses('fromInput');
  };

  const dashboarUploadInventory = () =>{
    setShowInventoryUploadModal(true);
    setShowABCReportingModal(false);
    setShowFileUploadModal(false);
    setShowInstanceInputsModal(false);
  }

const handleInventoryModel= () =>{
  setShowInventoryUploadModal(false);
}

  return (
    <div className="container-fluid position-relative">
      <header className="row bg-primary text-white py-3 px-4">
        <div className="col-md-6 d-flex align-items-center">
          <h5>Welcome</h5>
        </div>
        <div className="col-md-6 text-end">
          <button className="btn btn-light" onClick={() => setShowInstanceInputsModal(true)}>
            Create New Cycle Counting Instance
          </button>
          <button className="btn btn-danger ms-2" onClick={signOut}>
            Sign Out
          </button>
        </div>
      </header>

      <InstanceInputsModal
        showModal={showInstanceInputsModal}
        handleCloseModal={handleCloseInstanceInputsModal}
        handleProceed={handleShowFileUploadModal}
        onInstanceCreated={refreshWarehouses}
      />

      <FileUploadModal
        showModal={showFileUploadModal}
        handleCloseModal={handleCloseFileUploadModal}
        handleProceed={handleABCModel}
        source={source}
      />

      <ABCReportingModal
        showModal={showABCReportingModal}
        handleCloseModal={handleCloseABCReportingModal}
      />

      <InventoryUploadModal
        showModal={showInventoryUploadModal}
        handleCloseModal={handleCloseInventoryUploadModal}
        handleProceed={handleInventoryModel}
      />

      <div className="row mt-4">
        <aside className="col-lg-3 col-md-4 mb-4 position-relative" ref={sidePanelRef} style={{ maxHeight: "80vh", overflowY: "auto" }}>
          {loading ? (
            <div className="d-flex justify-content-center align-items-center vh-100">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : warehouses.length === 0 ? (
            <div className="text-center mt-5">
              <p className="text-muted">No instances available</p>
            </div>
          ) : (
            warehouses.map((warehouse:any, index:number) => (
              <div
                key={warehouse.Warehouse_ID}
                className={`card position-relative mt-3 ${
                  activeIndex === index ? "border-primary" : ""
                }`}
                onClick={() => handleActiveClick(index)}
                style={{ cursor: "pointer" }}
              >
                <div className="card-body">
                  <h5 className="card-title">
                    {warehouse.Warehouse_Name}
                    {activeIndex === index && (
                      <span className="badge bg-success ms-2">Active</span>
                    )}
                  </h5>
                  <p className="card-subtitle text-muted">
                    Created: {warehouse.Created_Date}
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
        <div className="col-md-2 mb-3">
        <button className="btn btn-primary w-100 rounded-pill" onClick={()=>dashboarUploadPart()}>
            Upload Parts File
          </button>
        </div>
        <div className="col-md-3 mb-3">
        <button className="btn btn-success w-100 rounded-pill" onClick={()=>dashboarUploadInventory()}>
            Upload Inventory File
          </button>
        </div>
        <div className="col-md-4 mb-3">
              <button className="btn btn-warning w-100 rounded-pill">
                Timeseries: Inventory vs. Actual Counts
              </button>
            </div>
        <div className="col-md-3 mb-3">
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
              <p>{dashboardData?.Total_Parts || "N/A"}</p>
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
              <p>N/A part numbers - N/A parts</p>
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
                A: {dashboardData?.A || "N/A"} part numbers (Top {activeWarehouse?.Category_A_size || "N/A"}%)
                <br />
                B: {dashboardData?.B || "N/A"} part numbers (Next {activeWarehouse?.Category_B_size || "N/A"}%)
                <br />
                C: {dashboardData?.C || "N/A"} part numbers (Last {activeWarehouse?.Category_C_size || "N/A"}%)
              </p>
              <button className="btn btn-primary btn-sm w-100" onClick={()=>handleABCModel()}>
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
                N/A Items
                <br />
                Batches in Production: N/A
                <br />
                Raw Materials: N/A
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
                Tomorrow - N/A parts
                <br />
                Today - N/A parts
                <br />
                Yesterday - N/A parts
              </p>
              <button className="btn btn-primary btn-sm w-100" onClick={() => navigate('/cycleCountingSchedule')}>
                See Calendar
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
      </div>
    </div>
  );
};

export default Dashboard;

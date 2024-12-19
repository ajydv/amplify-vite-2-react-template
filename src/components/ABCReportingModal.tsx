import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { apiPost } from "../services/apiService";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

interface ABCReportingModalProps {
  showModal: boolean;
  handleCloseModal: () => void;
}

interface CategorizationData {
  Part_Number: string;
  Consumption: number;
  Cost: number;
  Part_Value: number;
  Weighted_Consumption: number;
  Weighted_Cost: number;
  Category: string;
  Annual_Consumption: number;
  Consumption_Perc: number;
}

const ABCReportingModal: React.FC<ABCReportingModalProps> = ({
  showModal,
  handleCloseModal,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [categoryData, setCategoryData] = useState<CategorizationData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { activeWarehouse } = useSelector((state: RootState) => state.warehouse);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    if (showModal && activeWarehouse) {
      getCategoryData();
    }
  }, [showModal]);

  const getCategoryData = async () => {
    if (!activeWarehouse) return;
    setLoading(true);
    const formData = {
      resource_name: "CategorizationView",
      condition: `Warehouse_ID=${activeWarehouse.Warehouse_ID}`,
    };
    try {
      const response = await apiPost("/get-data", formData);
      if (response.data.statusCode === 200) {
        const sortedData = response.data.data.sort((a: CategorizationData, b: CategorizationData) => {
          if (a.Category < b.Category) return -1;
          if (a.Category > b.Category) return 1;
          return 0;
        });
        setCategoryData(sortedData);
      } else {
        setCategoryData([]);
        console.error("Error: Invalid response", response.data);
      }
    } catch (error) {
      console.error("Error fetching Categorization data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`modal fade ${showModal ? "show" : ""}`}
      tabIndex={-1}
      style={{ display: showModal ? "block" : "none" }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">ABC Reporting</h5>
            <button type="button" className="btn-close" onClick={handleCloseModal}></button>
          </div>
          <div
            className="modal-body"
            style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}
          >
            <div className="container">
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

              <h5 className="text-center fw-bold">ABC Categories Generated</h5>
              <p className="text-center text-muted">
                Below are the ABC categories generated. After clicking Done, you will be redirected to the home page where you can see the cycle counts generated.
              </p>

              <div className="table-responsive" style={{ maxHeight: "400px", overflowY: "auto" }}>
                {loading ? (
                  <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : categoryData.length > 0 ? (
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
                      {categoryData.map((item, index) => (
                        <tr key={index}>
                          <td>{item.Part_Number}</td>
                          <td>{item.Consumption}</td>
                          <td>{item.Cost.toFixed(2)}</td>
                          <td>{item.Annual_Consumption.toFixed(2)}</td>
                          <td>{item.Consumption_Perc.toFixed(2)}%</td>
                          <td>
                            <span
                              className={`badge ${
                                item.Category === "A"
                                  ? "bg-success"
                                  : item.Category === "B"
                                  ? "bg-warning"
                                  : "bg-danger"
                              }`}
                            >
                              {item.Category}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-center text-muted">No data available</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ABCReportingModal;

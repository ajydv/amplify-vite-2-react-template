import React from "react";

const DailyCount: React.FC = () => {

  return (
    <div className="container-fluid position-relative">
      <div className="row bg-primary text-white py-3 px-4">
        <div className="col-md-6 d-flex align-items-center">
          <h5>Daily Count Details - 10-17 10-10</h5>
        </div>
        <div className="col-md-6 d-flex text-end">
            <div className="col-md-8">
            <button className="btn btn-danger">Assign Parts to worker</button>
            </div>
            <div className="col-md-3">
            <button className="btn btn-light">Perform Count</button>
            </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-lg-12 col-md-12 position-relative">
          <div className="card position-absolute top-0 start-0 w-100 h-100 bg-light z-index-0">
            <div className="card-body"></div>
          </div>
          
          <div className="row mb-4 position-relative z-index-1 mt-5">
            <div className="col-md-4 mb-3">
              <button className="btn btn-primary w-100">
                Total A Parts : 200
              </button>
            </div>
            <div className="col-md-4 mb-3">
              <button className="btn btn-success w-100">
              Total B Parts : 50
              </button>
            </div>
            <div className="col-md-4 mb-3">
              <button className="btn btn-danger w-100">
              Total C Parts : 50
                </button>
            </div>
          </div>

          <div className="row mb-4 position-relative z-index-1 mt-5">
            <div className="col-md-4 mb-3">
                <div className="card-body">
                  <button className="btn btn-primary btn-sm w-100">
                    Category A Parts of Count
                  </button>
                  <div className="table-responsive" style={{ maxHeight: "200px", overflowY: "auto" }}>
                  <table className="table table-bordered table-striped align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>Part Number</th>
                      <th>Location</th>
                      <th>Parts</th>
                    </tr>
                  </thead>
                  <tbody className="table-striped">
                    <tr>
                      <td>EL0263</td>
                      <td>shelf 054</td>
                      <td>96</td>
                    </tr>
                    <tr>
                      <td>EL0263</td>
                      <td>shelf 054</td>
                      <td>96</td>
                    </tr>
                    <tr>
                      <td>EL0263</td>
                      <td>shelf 054</td>
                      <td>96</td>
                    </tr>
                    <tr>
                      <td>EL0263</td>
                      <td>shelf 054</td>
                      <td>96</td>
                    </tr>
                    <tr>
                      <td>EL0263</td>
                      <td>shelf 054</td>
                      <td>96</td>
                    </tr>
                    <tr>
                      <td>EL0263</td>
                      <td>shelf 054</td>
                      <td>96</td>
                    </tr>
                    </tbody>
                  </table>
                  </div>
                </div>
            </div>
            <div className="col-md-4 mb-3">
                <div className="card-body">
                  <button className="btn btn-success btn-sm w-100">
                    Category A Parts of Count
                  </button>
                  <div className="table-responsive" style={{ maxHeight: "200px", overflowY: "auto" }}>
                  <table className="table table-bordered table-striped align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>Part Number</th>
                      <th>Location</th>
                      <th>Parts</th>
                    </tr>
                  </thead>
                  <tbody className="table-striped">
                    <tr>
                      <td>EL0263</td>
                      <td>shelf 054</td>
                      <td>96</td>
                    </tr>
                    <tr>
                      <td>EL0263</td>
                      <td>shelf 054</td>
                      <td>96</td>
                    </tr>
                    <tr>
                      <td>EL0263</td>
                      <td>shelf 054</td>
                      <td>96</td>
                    </tr>
                    <tr>
                      <td>EL0263</td>
                      <td>shelf 054</td>
                      <td>96</td>
                    </tr>
                    <tr>
                      <td>EL0263</td>
                      <td>shelf 054</td>
                      <td>96</td>
                    </tr>
                    <tr>
                      <td>EL0263</td>
                      <td>shelf 054</td>
                      <td>96</td>
                    </tr>
                    </tbody>
                  </table>
                  </div>
                </div>
            </div>
            <div className="col-md-4 mb-3">
                <div className="card-body">
                  <button className="btn btn-danger btn-sm w-100">
                    Category A Parts of Count
                  </button>
                  <div className="table-responsive" style={{ maxHeight: "200px", overflowY: "auto" }}>
                  <table className="table table-bordered table-striped align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>Part Number</th>
                      <th>Location</th>
                      <th>Parts</th>
                    </tr>
                  </thead>
                  <tbody className="table-striped">
                    <tr>
                      <td>EL0263</td>
                      <td>shelf 054</td>
                      <td>96</td>
                    </tr>
                    <tr>
                      <td>EL0263</td>
                      <td>shelf 054</td>
                      <td>96</td>
                    </tr>
                    <tr>
                      <td>EL0263</td>
                      <td>shelf 054</td>
                      <td>96</td>
                    </tr>
                    <tr>
                      <td>EL0263</td>
                      <td>shelf 054</td>
                      <td>96</td>
                    </tr>
                    <tr>
                      <td>EL0263</td>
                      <td>shelf 054</td>
                      <td>96</td>
                    </tr>
                    <tr>
                      <td>EL0263</td>
                      <td>shelf 054</td>
                      <td>96</td>
                    </tr>
                    </tbody>
                  </table>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyCount;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "../pages/Home"; 
import Upload from "../pages/Upload";
import Dashboard from "../pages/Dashboard";
import DailyCount from "../pages/DailyCount";
import CycleCountingSchedule from "../pages/CycleCountingSchedule";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/upload" element={<Upload />} />
        <Route path="/dailycount" element={<DailyCount/>}/>
        <Route path="/cycleCountingSchedule" element={<CycleCountingSchedule/>}/>
      </Routes>
    </Router>
  );
};

export default AppRouter;

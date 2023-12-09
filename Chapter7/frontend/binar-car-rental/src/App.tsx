import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Cars from "./pages/Cars";
import AddCars from "./pages/AddCars";
import SearchCar from "./pages/SearchCar";
import EditCar from "./pages/EditCar";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/cars" element={<Cars />} />
        <Route path="/dashboard/addcars" element={<AddCars />} />
        <Route path="/dashboard/editcar" element={<EditCar />} />
        <Route path="/search" element={<SearchCar />} />
      </Routes>
    </>
  );
}

export default App;

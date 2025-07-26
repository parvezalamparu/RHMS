import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./components/store/pages/Dashboard";
import InventoryPage from "./components/store/pages/InventoryPage";
import RequisitionPage from './components/store/pages/RequisitionPage';
import PurchaseOrderPage from './components/store/pages/PurchesOrderPage';
import LoginPage from './components/general/LoginPage';
import VendorPage from './components/store/pages/VendorPage';
import PurchesListPage from './components/store/pages/PurchesListPage';
import AddPurchaseForm from './components/store/forms/AddPurchaseForm';

const AppRoutes = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";
  return (
    <>
      {isLoginPage ? (
        <Routes>
          <Route path="/" element={<LoginPage />} />
        </Routes>
      ) : (
        <MainLayout>
          <Routes>
            {/* ALL STORE ROUTES */}
            <Route path="/store/dashboard" element={<Dashboard />} />
            <Route path="/store/purchase-orders" element={<PurchaseOrderPage />} />
            <Route path="/store/inventory" element={<InventoryPage />} />
            <Route path="/store/requisition" element={<RequisitionPage />} />
            <Route path="/store/vendor" element={<VendorPage/>} />
            <Route path="/store/purchase-list" element={<PurchesListPage/>} />
            <Route path="/store/purchase-list/add-purchase-form" element={<AddPurchaseForm/>} />
            {/* More routes here */}
          </Routes>
        </MainLayout>
      )}
    </>
  );
};

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;

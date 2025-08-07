import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

// Layouts
import StoreLayout from "./layouts/StoreLayout";
import MainLayout from "./layouts/MainLayout"; 

// General Pages
import LoginPage from "./pages/general/LoginPage";
import { MainDashboard } from "./pages/general/MainDashboard";
// import Users from "./pages/general/admin/UsersPage";

// Store Pages
import Dashboard from "./pages/store/StoreDashboard";
import InventoryPage from "./pages/store/InventoryPage";
import RequisitionPage from "./pages/store/RequisitionPage";
import PurchaseOrderPage from "./pages/store/PurchesOrderPage";
import VendorPage from "./pages/store/VendorPage";
import PurchesListPage from "./pages/store/PurchesListPage";
import AddPurchaseForm from "./components/store/forms/AddPurchaseForm";
import AddPurchaseOrderForm from "./components/store/forms/AddPurchaseOrderForm";
import AddRequisitionForm from "./components/store/forms/AddRequisitionForm";
import ItemCategoryPage from "./pages/store/ItemCategoryPage";
import ItemUnitPage from "./pages/store/ItemUnitPage";
import ItemTypePage from "./pages/store/ItemTypePage";
import ItemCompanyPage from "./pages/store/ItemCompanyPage";
import ItemStorePage from "./pages/store/ItemStorePage";
import StoreDepartmentPage from "./pages/store/StoreDepartmentPage";
import ReturnPage from "./pages/store/ReturnPage";
import RepairItems from "./pages/store/RepairItemsPage";
import Reports from "./pages/store/ReportsPage";
import ItemIssue from "./pages/store/ItemIssuePage";
import Invoice from "./pages/store/InvoicePage"
import ViewItemDetails from "./pages/store/ViewItemDetails";

// React hot toast
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
    <Toaster position="top-right" reverseOrder= {false} />
    <Router>
      <Routes>
        {/* Login Page (No layout) */}
        <Route path="/" element={<LoginPage />} />

        {/* Main Dashboard (MainSidebar + Topbar) */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<MainDashboard />} />
          {/* <Route path="/admin/users" element={<Users />} /> */}


        </Route>

        {/* Store Routes (StoreSidebar + Topbar) */}
        <Route element={<StoreLayout />}>
          <Route path="/store/dashboard" element={<Dashboard />} />
          <Route path="/store/all-items" element={<InventoryPage />} />
          <Route path="/store/requisition" element={<RequisitionPage />} />
          <Route path="/store/purchase-orders" element={<PurchaseOrderPage />} />
          <Route path="/store/vendor" element={<VendorPage />} />
          <Route path="/store/purchase-list" element={<PurchesListPage />} />
          <Route path="/store/purchase-list/add-purchase-form" element={<AddPurchaseForm />} />
          <Route path="/store/purchase-orders/add-purchase-order" element={<AddPurchaseOrderForm />} />
          <Route path="/store/requisition/add-requisition-form" element={<AddRequisitionForm />} />
          <Route path="/store/item-category" element={<ItemCategoryPage />} />
          <Route path="/store/item-unit" element={<ItemUnitPage />} />
          <Route path="/store/item-type" element={<ItemTypePage />} />
          <Route path="/store/item-company" element={<ItemCompanyPage />} />
          <Route path="/store/item-store" element={<ItemStorePage />} />
          <Route path="/store/store-department" element={<StoreDepartmentPage />} />
          <Route path="/store/return" element={<ReturnPage />} />
          <Route path="/store/repair-items" element={<RepairItems />} />
          <Route path="/store/reports" element={<Reports />} />
          <Route path="/store/item-issue" element={<ItemIssue />} />
          <Route path="/store/invoice" element={<Invoice />} />
          <Route path="/store/all-items/:id" element={<ViewItemDetails />} />

        </Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;

import { Navigate, Route, Routes } from "react-router-dom";
import AppShell from "./components/AppShell.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ApiDocumentsPage from "./pages/ApiDocumentsPage.jsx";
import AcquirerControlPage from "./pages/AcquirerControlPage.jsx";
import DisputeCenterPage from "./pages/DisputeCenterPage.jsx";
import ChangePasswordPage from "./pages/ChangePasswordPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import GatewayRoutingPage from "./pages/GatewayRoutingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import MerchantDirectoryPage from "./pages/MerchantDirectoryPage.jsx";
import ManageProfilePage from "./pages/ManageProfilePage.jsx";
import MerchantOnboardingPage from "./pages/MerchantOnboardingPage.jsx";
import PayInLinkPage from "./pages/PayInLinkPage.jsx";
import PayInStatusPage from "./pages/PayInStatusPage.jsx";
import PayoutRequestPage from "./pages/PayoutRequestPage.jsx";
import CallbackMonitorPage from "./pages/CallbackMonitorPage.jsx";
import ReconciliationHubPage from "./pages/ReconciliationHubPage.jsx";
import ReserveControlPage from "./pages/ReserveControlPage.jsx";
import RiskCompliancePage from "./pages/RiskCompliancePage.jsx";
import SettlementReportPage from "./pages/SettlementReportPage.jsx";
import WalletReportPage from "./pages/WalletReportPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AppShell />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/payin-link" element={<PayInLinkPage />} />
          <Route path="/payin-status" element={<PayInStatusPage />} />
          <Route path="/payout-request" element={<PayoutRequestPage />} />
          <Route path="/settlement-report" element={<SettlementReportPage />} />
          <Route path="/wallet-report" element={<WalletReportPage />} />
          <Route path="/merchant-onboarding" element={<MerchantOnboardingPage />} />
          <Route path="/merchant-directory" element={<MerchantDirectoryPage />} />
          <Route path="/gateway-routing" element={<GatewayRoutingPage />} />
          <Route path="/acquirer-control" element={<AcquirerControlPage />} />
          <Route path="/callback-monitor" element={<CallbackMonitorPage />} />
          <Route path="/risk-compliance" element={<RiskCompliancePage />} />
          <Route path="/reserve-control" element={<ReserveControlPage />} />
          <Route path="/dispute-center" element={<DisputeCenterPage />} />
          <Route path="/reconciliation-hub" element={<ReconciliationHubPage />} />
          <Route path="/manage-profile" element={<ManageProfilePage />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/api-documents" element={<ApiDocumentsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

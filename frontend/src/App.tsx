import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AccountPage from "./pages/AccountPage";
import CheckoutPage from "./pages/CheckoutPage";
import CToverviewPage from "./pages/CTOverviewPage";
import CTresourcePage from "./pages/CTresourcePage";
import CTtenantOverview from "./pages/CTtenantOverview";
import OwnBookingsPage from "./pages/OwnBookingsPage";
import NotFoundPage from "./pages/NotFoundPage";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <Routes>
      <>
        <Route path="/" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />

        <Route path="/homepage" element={
            <div style={{ marginLeft: "250px", padding: "20px", flex: 1 }}>
              <HomePage />
            </div>
          } />

        <Route path="/accountpage" element={<AccountPage />} />
        <Route path="/checkoutpage" element={<CheckoutPage />} />
        <Route path="/ctoverviewpage" element={<CToverviewPage />} />
        <Route path="/ctresourcepage" element={<CTresourcePage />} />
        <Route path="/cttenantoverview" element={<CTtenantOverview />} />
        <Route path="/ownbookingspage" element={<OwnBookingsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />

      </>
    </Routes>
  );
}

export default App;

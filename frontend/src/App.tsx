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
        <Route path="/opret-konto" element={<SignUpPage />} />

        <Route path="/hjem" element={
            <div style={{ marginLeft: "250px", padding: "20px", flex: 1 }}>
              <HomePage />
            </div>
          } />

        <Route path="/konto" element={<AccountPage />} />
        <Route path="/reservation-overblik" element={<CheckoutPage />} />
        <Route path="/admin-overblik" element={<CToverviewPage />} />
        <Route path="/ressource-overblik" element={<CTresourcePage />} />
        <Route path="/beboer-overblik" element={<CTtenantOverview />} />
        <Route path="/mine-reservationer" element={<OwnBookingsPage />} />
        <Route path="/kontakt" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />

      </>
    </Routes>
  );
}

export default App;

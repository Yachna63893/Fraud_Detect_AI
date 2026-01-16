import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Hero from "./pages/Hero";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Fraud from "./pages/Fraud";
import Anomaly from "./pages/Anomaly";
import Ecom from "./pages/Ecom";
import Heatmap from "./pages/Heatmap";
import Complaint from "./pages/Complaint";
import Credit from "./pages/Credit";
import UPI from "./pages/UPI";
import Alerts from "./pages/Alerts";
import Footer from "./pages/Footer";

import About from "./components/About";
import HowItWorks from "./components/HowItWorks";
import Sidebar from "./components/Sidebar";

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <>
      {/* Sidebar only after login */}
      {authenticated && <Sidebar showOnHero={true} />}

      <Routes>
        {/* AUTH */}
        <Route
          path="/login"
          element={<Auth onSuccess={() => setAuthenticated(true)} />}
        />

        {/* LANDING PAGE */}
        <Route
          path="/"
          element={
            authenticated ? (
              <>
                <Hero />
                <About />
                <HowItWorks />
                <Footer />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* PROTECTED ROUTES */}
        <Route
          path="/dashboard"
          element={authenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/fraud"
          element={authenticated ? <Fraud /> : <Navigate to="/login" />}
        />
        <Route
          path="/anomaly"
          element={authenticated ? <Anomaly /> : <Navigate to="/login" />}
        />
        <Route
          path="/ecom"
          element={authenticated ? <Ecom /> : <Navigate to="/login" />}
        />
        <Route
          path="/heatmap"
          element={authenticated ? <Heatmap /> : <Navigate to="/login" />}
        />
        <Route
          path="/complaint"
          element={authenticated ? <Complaint /> : <Navigate to="/login" />}
        />
        <Route
          path="/credit"
          element={authenticated ? <Credit /> : <Navigate to="/login" />}
        />
        <Route
          path="/upi"
          element={authenticated ? <UPI /> : <Navigate to="/login" />}
        />
        <Route
          path="/alerts"
          element={authenticated ? <Alerts /> : <Navigate to="/login" />}
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;

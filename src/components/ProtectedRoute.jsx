import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { fetchMe, hasSession } from "../lib/api.js";

export default function ProtectedRoute() {
  const location = useLocation();
  const [status, setStatus] = useState(hasSession() ? "checking" : "unauthorized");

  useEffect(() => {
    if (!hasSession()) {
      setStatus("unauthorized");
      return;
    }

    fetchMe()
      .then(() => setStatus("authorized"))
      .catch(() => setStatus("unauthorized"));
  }, [location.pathname]);

  if (status === "checking") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 text-slate-600">
        Loading dashboard...
      </div>
    );
  }

  if (status === "unauthorized") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

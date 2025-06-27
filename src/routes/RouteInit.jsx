// src/components/RouteInit.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoader } from "../contexts/LoaderContext";
import { useAuth } from "../contexts/AuthContext";
import { initNavigation } from "../utils/navigation";

function RouteInit() {
  const navigate = useNavigate();
  const { setLoading } = useLoader();
  const auth = useAuth();

  useEffect(() => {
    initNavigation({ navigate, setLoading, auth });
  }, [navigate, setLoading, auth]);

  return null;
}

export default RouteInit;

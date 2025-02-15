import { BrowserRouter, Route, Navigate, Routes, useLocation, useNavigate } from "react-router-dom";
import { TaskContextProvider, useTask } from "context/TaskContext";
import React, { useEffect } from "react";
import { client } from "supabase/client";
import ReactDOM from "react-dom/client";
import ContactUs from "views/contact";
import SignUp from "views/signup";
import LogIn from "views/login";
import Index from "views";
import ProfilePage from "views/profile";
import "./index.css";
import "./i18n";

const App = () => {
  return (
    <TaskContextProvider>
      <MainApp />
    </TaskContextProvider>
  );
};

const MainApp = () => {
  const { updateProfile, setUserId } = useTask();

  useEffect(() => {
    const authListener = client.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session?.user?.id) {
        setUserId(session?.user?.id);
        updateProfile();
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [updateProfile]);

  return (
    <BrowserRouter>
      <HideRoutes />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

const HideRoutes = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname !== "/") {
      setTimeout(() => {
        window.history.replaceState(null, "", window.location.origin);
      }, 100); // Retraso breve para evitar parpadeo
    }
  }, [location]);

  return null;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

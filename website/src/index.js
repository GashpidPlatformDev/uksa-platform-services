import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import { TaskContextProvider, useTask } from "context/TaskContext";
import React, { useEffect } from "react";
import { client } from "schema/client";
import ReactDOM from "react-dom/client";
import ContactUs from "views/contact";
import SignUp from "views/signup";
import LogIn from "views/login";
import Index from "views";
import ProfilePage from "views/profile";
import "./index.css";
import "./i18n";
import Courses from "views/courses";
import Workshops from "views/workshops";
import Exams from "views/exams";
import PrivacyPolicy from "views/privacy";

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
  }, [updateProfile, setUserId]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<LogIn />} />
        <Route path="/exams" element={<Exams />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/workshops" element={<Workshops />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);














/*
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.resend.com",
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: "resend",
    pass: "re_HzDgH8JV_4SFkaaZ1LyhHSfU5pNmtPcnh",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Maddison Foo Koch 👻" <support@uksaidiomas.com>', // sender address
    to: "gizquierdorojas@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

main().catch(console.error);*/




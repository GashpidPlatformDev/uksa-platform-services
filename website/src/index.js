import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import React, { useEffect } from 'react';
import Index from 'views';
import './index.css';
import './i18n';
import LogIn from "views/login";
import ContactUs from "views/contact";
import SignUp from "views/signup";
import { client } from "supabase/client";
//import reportWebVitals from './reportWebVitals';


const App = () => {
  useEffect(() => {
    client.auth.onAuthStateChange((event, session) => {
      setTimeout(async () => {
        // await on other Supabase function here
        // this runs right after the callback has finished
        console.log(event,session)
      }, 0)
    })
    
  }, []);

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();

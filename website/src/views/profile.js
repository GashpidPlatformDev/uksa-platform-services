import Footer from "components/footer";
import ProfilePageHeader from "components/headers/profile/profile-header";
import Navbar from "components/navbar";
import React, { useState } from "react";

const followsData = [
  {
    id: 1,
    title: "Flume",
    description: "Musical Producer",
    image: require("assets/img/bg5.jpg"),
  },
  {
    id: 2,
    title: "Banks",
    description: "Singer",
    image: require("assets/img/bg5.jpg"),
  },
  {
    id: 3,
    title: "ODESZA",
    description: "Electronic Duo",
    image: require("assets/img/bg5.jpg"),
  },
  {
    id: 4,
    title: "KAYTRANADA",
    description: "Music Producer",
    image: require("assets/img/bg5.jpg"),
  },
];

function ProfilePage() {
  const [activeTab, setActiveTab] = useState("1");

  return (
    <>
    <Navbar />
      <div className="profile-container">
        <ProfilePageHeader />
        
        {/*<UserProfile />*/}
        <div className="nav-container">
          <div className="nav-tabs">
            <span
              className={`nav-text ${activeTab === "1" ? "active" : ""}`}
              onClick={() => setActiveTab("1")}
            >
              Follows
            </span>
            <span
              className={`nav-text ${activeTab === "2" ? "active" : ""}`}
              onClick={() => setActiveTab("2")}
            >
              Following
            </span>
          </div>

        {/* Línea separadora con flecha */}
        <div className="nav-separator">
          <div
            className="nav-indicator"
            style={{
              left: activeTab === "1" ? "35%" : "65%",
              transform: "translateX(-50%)",
            }}
          ></div>
        </div>
      </div>

      {/* Contenido dinámico */}
      <div className="tab-content">
        {activeTab === "1" && (
          <div className="cards-container">
            <div className="content">
            <h3>Nothing here yet...</h3>
            <p>Start following more people!</p>
          </div>
          </div>
        )}
        {activeTab === "2" && (
          <button className="auth-button" onClick={() => window.open('https://classrooms.uksaidiomas.com', '_blank')}>
          Classrooms
        </button>
        
        )}
      </div>
    </div>
    <Footer />
    </>
  );
}

export default ProfilePage;

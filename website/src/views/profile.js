import Footer from "components/footer";
import ProfilePageHeader from "components/headers/profile/profile-header";
import Navbar from "components/navbar";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function ProfilePage() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState("1");

  const handleRedirect = () => {
    window.open('https://classrooms.uksaidiomas.com', '_blank');
  }

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
              {t("profile.tabs.L.title")}
            </span>
            <span
              className={`nav-text ${activeTab === "2" ? "active" : ""}`}
              onClick={() => setActiveTab("2")}
            >
              {t("profile.tabs.R.title")}
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
            <h3>{t("profile.tabs.L.empty")}</h3>
          </div>
          </div>
        )}
        {activeTab === "2" && (
          <button className="auth-button" onClick={handleRedirect}>
          {t("profile.tabs.R.moodle")}
        </button>
        )}
      </div>
    </div>
    <Footer />
    </>
  );
}

export default ProfilePage;

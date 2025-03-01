import { useTask } from "context/TaskContext";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { client } from "schema/client";

const NavbarDropdownMenu = ({ triggerRef }) => {
  const { logOut } = useTask();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dropdownRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const updatePosition = useCallback(() => {
    if (triggerRef.current && dropdownRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const dropdownRect = dropdownRef.current.getBoundingClientRect();

      let top = triggerRect.bottom;
      let left = triggerRect.left;

      if (left + dropdownRect.width > window.innerWidth) {
        left = window.innerWidth - dropdownRect.width - 10;
      }

      setPosition({
        top: top,
        left: left,
      });
    }
  }, [triggerRef]);

  useEffect(() => {
    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("resize", updatePosition);
    };
  }, [updatePosition]);

  const handleLogOut = async () => {
    let { error } = await client.auth.signOut();
    if (!error) {
      logOut();
      navigate("/");
    }
  };

  return (
    <div
      ref={dropdownRef}
      className="dropdown-menu"
      style={{
        position: "fixed",
        top: position.top,
        left: position.left,
        zIndex: 1000,
      }}
    >
      <Link to="/profile" style={{ textDecoration: "none" }}>
        <button className="dropdown-item">{t("navbar.dropdown.btn1")}</button>
      </Link>
      <button className="dropdown-item" onClick={handleLogOut}>
        {t("navbar.dropdown.btn2")}
      </button>
    </div>
  );
};

export default NavbarDropdownMenu;
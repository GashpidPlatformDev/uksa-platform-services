import React, { useEffect, useState } from 'react';
import { Navbar, Nav, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {userIcon, navbarIcon, downArrow, menuIcon, langIcon, coursesIcon, examsIcon, servicesIcon} from '../imports/imports';
import { useTranslation } from "react-i18next";
import { useTask } from 'context/TaskContext';
import { Link } from 'react-router-dom';

const MobileNavbar = ({ setCurrentLang }) => {
  const {profile} = useTask()
  const { t, i18n } = useTranslation();
  const [userName, setUserName] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navbar = t("navbar", { returnObjects: true });
  const icons = [coursesIcon, examsIcon, servicesIcon];
  const [isDropdown_menu, setDropdown_menu] = useState(false);
  const [expandedSubMenus, setExpandedSubMenus] = useState([false, false, false]);

  useEffect(() => {
      if(profile?.data[0]?.name) {
        const name = profile?.data[0]?.name.split(" ");
        setUserName(name);
      }
    },[profile])
  
  const langs = [
    t("navbar.langs.item-1"), 
    t("navbar.langs.item-2"), 
    t("navbar.langs.item-3"), 
    t("navbar.langs.item-4"), 
    t("navbar.langs.item-5")
  ];

  const toggleDropdown  = () => setDropdown_menu(!isDropdown_menu);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleSubMenu = (index) => {
    setExpandedSubMenus((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  function changeLanguage(lang) {
    const match = lang.match(/\(([^)]+)\)/);
    console.log(match)
    if (match) {
      const result = match[1];
      i18n.changeLanguage(result);
    }
  };

  const handleSelectLang = (index) => {
    changeLanguage(langs[index]);
    setCurrentLang(langs[index]);
  };

  return (
    <>
    <Navbar className="navbar-desktop" expand="md" fixed="top">
      <div className="navbar-mobile-align">
        <Link href="/">
          <img src={navbarIcon} alt="Navbar-Icon" className="navbar-mobile-logo" />
        </Link>
        <div className="navbar-mobile-right-elements">
          <Nav className="navbar-mobile-links" navbar>
            <UncontrolledDropdown nav inNavbar className="navbar-dropdown">
              <DropdownToggle nav className="navbar-link" onClick={toggleMenu}>
                <img src={menuIcon} alt="Courses-Icon" />
              </DropdownToggle>
            </UncontrolledDropdown>
            
            <UncontrolledDropdown inNavbar className="navbar-dropdown">
              <DropdownToggle nav className="navbar-link" onClick={toggleDropdown}>
                <img src={langIcon} alt="Lang-Icon" style={{margin:"3px"}}/>
                <img src={downArrow} alt="Lang-Arrow-Icon" />
              </DropdownToggle>
              <DropdownMenu right className="navbar-mobile-dropdown-menu" hidden={!isDropdown_menu} onMouseLeave={toggleDropdown}>
                <DropdownItem className="navbar-mobile-dropdown-item" onClick={() => handleSelectLang(0)}>{langs[0]}</DropdownItem>
                <DropdownItem className="navbar-mobile-dropdown-item" onClick={() => handleSelectLang(1)}>{langs[1]}</DropdownItem>
                <DropdownItem className="navbar-mobile-dropdown-item" onClick={() => handleSelectLang(2)}>{langs[2]}</DropdownItem>
                <DropdownItem className="navbar-mobile-dropdown-item" onClick={() => handleSelectLang(3)}>{langs[3]}</DropdownItem>
                <DropdownItem className="navbar-mobile-dropdown-item" onClick={() => handleSelectLang(4)}>{langs[4]}</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <div className="navbar-mobile-login">
            <Link to={t("navbar.single-menu-3.path")}>
              <img src={userIcon} alt="User-Icon" />
            </Link>
            <Link to={t("navbar.single-menu-3.path")} className="navbar-link">{userName ? userName : t("navbar.single-menu-3.title")}</Link>
          </div>
        </div>
      </div>
    </Navbar>

    <div className={`sliding-menu ${isMenuOpen ? 'open' : ''}`}>
      <nav>
        <ul className="sliding-menu-items">
          <li className="sliding-static-item">
            <Link to={t("navbar.single-menu-1.path")} className="link-sliding">{t("navbar.single-menu-1.title")}</Link>
          </li>
          {Object.entries(navbar.menus).map(([key, menu], index) => (
            <li key={key}>
              <div className="sliding-menu-title" onClick={() => toggleSubMenu(index)}>
                <img src={icons[index]} alt={"menu-icon-mobile-navbar-"+index} />
                {menu.title}
                <img src={downArrow} alt="Courses-Arrow-Icon" />
              </div>
              <ul className={`sliding-submenu ${expandedSubMenus[index] ? 'expanded' : ''}`}>
                {Object.entries(menu.items).map(([key, value]) => (
                  <li key={key}>
                    <Link to={value.path} className="navbar-sliding-dropdown-item">
                      {value.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
          <li className="sliding-static-item">
            <Link to={t("navbar.single-menu-2.path")} className="link-sliding">{t("navbar.single-menu-2.title")}</Link>
          </li>
        </ul>
      </nav>
    </div>
    </>
  );
};

export default MobileNavbar;
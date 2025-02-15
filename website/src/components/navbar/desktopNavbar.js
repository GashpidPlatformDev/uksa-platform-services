import React, { useEffect, useRef, useState } from 'react';
import { Navbar, Nav, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {userIcon, navbarIcon, coursesIcon, examsIcon, servicesIcon, downArrow, lensIcon, langIcon} from '../imports/imports';
import { useTranslation } from "react-i18next";
import { useTask } from 'context/TaskContext';
import { Link } from 'react-router-dom';
import NavbarDropdownMenu from './dropdown';


const DesktopNavbar = ({ currentLang, setCurrentLang }) => {
  const {profile} = useTask()
  const loginRef = useRef(null);
  const { t, i18n } = useTranslation();
  const [userName, setUserName] = useState(null);
  const navbar = t("navbar", { returnObjects: true });
  const icons = [coursesIcon, examsIcon, servicesIcon];
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdown_menu_1, setDropdown_menu_1] = useState(false);
  const [isDropdown_menu_2, setDropdown_menu_2] = useState(false);
  const [isDropdown_menu_3, setDropdown_menu_3] = useState(false);
  const [isDropdown_menu_4, setDropdown_menu_4] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const isDropdownMenus = [isDropdown_menu_1, isDropdown_menu_2, isDropdown_menu_3]

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

  const handleSearchClick = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };

  const toggleDropdown  = (id) => {
    switch (id){
      case 0:
        setDropdown_menu_1(!isDropdown_menu_1);
        setDropdown_menu_2(false);
        setDropdown_menu_3(false);
        break;
      case 1:
        setDropdown_menu_1(false);
        setDropdown_menu_2(!isDropdown_menu_2);
        setDropdown_menu_3(false);
        break;
      case 2:
        setDropdown_menu_1(false);
        setDropdown_menu_2(false);
        setDropdown_menu_3(!isDropdown_menu_3);
        break;
      case 3:
        setDropdown_menu_4(!isDropdown_menu_4);
        break;
      default:
        break;
    }
  }

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
    <Navbar className="navbar-desktop" expand="md" fixed="top">
      <div className="navbar-desktop-align">
        <Link to="/">
          <img src={navbarIcon} alt="Navbar-Icon" className="navbar-desktop-logo" />
        </Link>
        <div className="navbar-desktop-right-elements">
          <Nav className="navbar-desktop-links" navbar>
            <NavItem>
              <Link to={t("navbar.single-menu-1.path")} className="navbar-link">{t("navbar.single-menu-1.title")}</Link>
            </NavItem>
            {Object.entries(navbar.menus).map(([key, menu], index) => (
              <UncontrolledDropdown key={key} nav inNavbar className="navbar-dropdown">
                <DropdownToggle nav className="navbar-link" onClick={() => toggleDropdown(index)}>
                  <img src={icons[index]} alt={"menu-icon-desktop-navbar-"+index} />
                  {menu.title}
                  <img src={downArrow} alt="Courses-Arrow-Icon" />
                </DropdownToggle>
                <DropdownMenu right className="navbar-desktop-dropdown-menu" hidden={!isDropdownMenus[index]} onPointerLeave={() => toggleDropdown(index)}>
                  {Object.entries(menu.items).map(([key, value]) => (
                    <Link key={key} to={value.path} className="navbar-desktop-dropdown-item">
                      {value.title}
                    </Link>
                  ))}
                </DropdownMenu>
              </UncontrolledDropdown>              
            ))}
            <NavItem>
              <Link to={t("navbar.single-menu-2.path")} className="navbar-link">{t("navbar.single-menu-2.title")}</Link>
            </NavItem>
          </Nav>
          <Nav className="navbar-desktop-login" ref={loginRef}>
            <Link 
              to={userName ? undefined : t("navbar.single-menu-3.path")}
              onClick={(e) => {
                if (userName) {
                  e.preventDefault();
                  setIsDropdownOpen(!isDropdownOpen);
                }
              }}
            >
              <img src={userIcon} alt="User-Icon" />
            </Link>

            <Link 
              to={userName ? "#" : t("navbar.single-menu-3.path")} 
              className="navbar-link"
              onClick={(e) => {
                if (userName) setIsDropdownOpen(!isDropdownOpen);
              }}
            >
              {userName ? userName : t("navbar.single-menu-3.title")}
            </Link>

            {isDropdownOpen && <NavbarDropdownMenu triggerRef={loginRef} />}
          </Nav>
        </div>
      </div>
      <Nav className="navbar-desktop-lang">
        <div className='navbar-desktop-lang-align'>
          {isSearchExpanded && (
            <input 
              type="text" 
              className="search-input" 
              placeholder={t("navbar.search-placeholder")}
            />
          )}
          <img src={lensIcon} alt="User-Icon" onClick={handleSearchClick}/>
          <UncontrolledDropdown inNavbar className="navbar-dropdown">
            <DropdownToggle nav className="navbar-link" onClick={() => toggleDropdown(3)}>
              <img src={langIcon} alt="Lang-Icon" style={{margin:"3px"}}/>
              {currentLang}
              <img src={downArrow} alt="Lang-Arrow-Icon" />
            </DropdownToggle>
            <DropdownMenu right className="navbar-desktop-dropdown-menu" hidden={!isDropdown_menu_4} onMouseLeave={() => toggleDropdown(3)}>
              <DropdownItem className="navbar-desktop-dropdown-item" onClick={() => handleSelectLang(0)}>{langs[0]}</DropdownItem>
              <DropdownItem className="navbar-desktop-dropdown-item" onClick={() => handleSelectLang(1)}>{langs[1]}</DropdownItem>
              <DropdownItem className="navbar-desktop-dropdown-item" onClick={() => handleSelectLang(2)}>{langs[2]}</DropdownItem>
              <DropdownItem className="navbar-desktop-dropdown-item" onClick={() => handleSelectLang(3)}>{langs[3]}</DropdownItem>
              <DropdownItem className="navbar-desktop-dropdown-item" onClick={() => handleSelectLang(4)}>{langs[4]}</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </Nav>
    </Navbar>
  );
};

export default DesktopNavbar;
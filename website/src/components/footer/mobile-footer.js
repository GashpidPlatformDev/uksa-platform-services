import { igIcon, inIcon, plusIcon, xIcon, ytIcon } from 'components/imports/imports';
import { Container, Row, Col } from 'reactstrap';
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

const MobileFooter = () => {
  const { t } = useTranslation();
  const footer = t("footer", { returnObjects: true });
  const [expandedSubMenus, setExpandedSubMenus] = useState(
    Object.keys(footer.menus).map(() => false)
  );

  const toggleSubMenu = (index) => {
    setExpandedSubMenus((prev) => {
      return prev.map((_, i) => i === index ? !prev[i] : false);
    });
  };
  return (
    <footer className="footer-mobile">
      <Container>
        <Col className='footer-sliding-menu-items'>
          {Object.entries(footer.menus).map(([key, menu], index) => (
              <li key={key}>
                <div className='footer-menu-align' onClick={() => toggleSubMenu(index)}>
                  <div className="footer-mobile-title">
                    {menu.title}
                  </div>
                  <img src={plusIcon} alt="Navbar-Icon" style={{height: "20px"}} />
                </div>
                <div className={`footer-underline-menu ${
                    expandedSubMenus[index] ? "expanded" : ""
                  }`} />
                <ul
                  className={`mobile-sliding-submenu ${
                    expandedSubMenus[index] ? "expanded" : ""
                  }`}
                >
                  {Object.entries(menu.items).map(([key, value]) => (
                    <li key={key}>
                      <Link to={value.path} className="footer-sliding-dropdown-item">
                        {value.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            )
          )}
        </Col>
        <Col md="6" className="footer-social-mobile">
          <a href="/" className="social-icon">
            <img src={igIcon} alt="Navbar-Icon" style={{height: "30px"}} />
          </a>
          <a href="/" className="social-icon">
            <img src={inIcon} alt="Navbar-Icon" style={{height: "30px"}} />
          </a>
          <a href="/" className="social-icon">
            <img src={xIcon} alt="Navbar-Icon" style={{height: "30px"}} />
          </a>
          <a href="/" className="social-icon">
            <img src={ytIcon} alt="yt-icon" style={{height: "30px"}} />
          </a>
        </Col>
        <Row className='footer-desktop-lower-row'>
          <Col md="6" className="footer-links mobile-policies-container">
            {Object.entries(footer.policies).map(([key, value]) => (
              <Link key={key} to={value.path} className='mobile-policies'>{value.title}</Link>
            ))}
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default MobileFooter;
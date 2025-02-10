import { footerIcon, igIcon, inIcon, xIcon, ytIcon } from 'components/imports/imports';
import { Container, Row, Col } from 'reactstrap';
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';
import React from 'react';

const DesktopFooter = () => {
  const { t } = useTranslation();
  const footer = t("footer", { returnObjects: true });
  return (
    <footer className="footer-desktop">
      <Container>
        <Row className='footer-desktop-row'>
          <Col md="3" className="footer-desktop-logo">
            <img src={footerIcon} alt="Navbar-Icon" className="navbar-desktop-logo" />
            <p className="footer-description">
              {t("footer.logo-desc")}
            </p>
          </Col>
          {Object.entries(footer.menus).map(([key, menu]) => (
            <Col key={key} md="2" className='footer-desktop-col'>
              <h5 className="footer-title">{menu.title}</h5>
              <ul className="footer-list">
                {Object.entries(menu.items).map(([key, value]) => (
                  <li key={key}>
                    <Link to={value.path} className="footer-link">
                      {value.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </Col>
          ))}
        </Row>

        <div className="footer-bottom">
          <Row className='footer-desktop-lower-row'>
            <Col md="6" className="footer-links">
              {Object.entries(footer.policies).map(([key, value]) => (
                <Link key={key} to={value.path}>{value.title}</Link>
              ))}
            </Col>
            <Col md="6" className="footer-social">
              <a href="/" className="social-icon">
                <img src={igIcon} alt="Navbar-Icon" style={{height: "20px"}} />
              </a>
              <a href="/" className="social-icon">
                <img src={inIcon} alt="Navbar-Icon" style={{height: "20px"}} />
              </a>
              <a href="/" className="social-icon">
                <img src={xIcon} alt="Navbar-Icon" style={{height: "20px"}} />
              </a>
              <a href="/" className="social-icon">
                <img src={ytIcon} alt="yt-icon" style={{height: "20px"}} />
              </a>
            </Col>
          </Row>
        </div>
      </Container>
    </footer>
  );
};

export default DesktopFooter;
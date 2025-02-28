import { footerIcon, igIcon, inIcon, xIcon, ytIcon } from 'components/imports/imports';
import { Container, Row, Col } from 'reactstrap';
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { Template } from 'sender/template';
import { sendEmail } from 'sender';
import { email_sender, quote_title, salesman, salesman_text } from 'components/structures';
import { FaPhone } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const DesktopFooter = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const isContactsPage = location.pathname === "/contact";
  const [formData, setFormData] = useState({
          whoWillTakeCourse: '',
          companyRequest: '',
          learningMethod: '',
          receiveInfo: false,
          phoneNumber: '',
          firstName: '',
          phoneType: '',
          lastName: '',
          language: '',
          comments: '',
          email: '',
          city: '',
  });
  const footer = t("footer", { returnObjects: true });

  const handleChange = (e) => {
          const { name, value, type, checked } = e.target;
          setFormData({
              ...formData,
              [name]: type === 'checkbox' ? checked : value,
          });
      };
  
      const handleSubmit = (e) => {
          e.preventDefault();
  
          const formattedHTML = Template(
              formData.firstName, 
              formData.lastName,
              formData.email,
              formData.phoneNumber,
              formData.phoneType,
              formData.city,
              formData.companyRequest,
              formData.learningMethod,
              formData.whoWillTakeCourse,
              formData.language || 'Unspecified',
              formData.comments || 'None'
          )
  
          sendEmail(salesman, email_sender, `${quote_title} ${formData.firstName}`, salesman_text, null, formattedHTML)
  
          setIsSubmitted(true);
          setTimeout(() => {
              setIsSubmitted(false)
          },1500);
      };

  return (
    <footer className="footer-desktop">
      <Container>
        <Row className='footer-desktop-row'>
          <Col md="3" className="footer-desktop-logo">
            <img src={footerIcon} alt="Navbar-Icon" className="navbar-desktop-logo" />
            <p className="footer-description" style={{color: "white"}}>
              {t("footer.logo-desc")}
            </p>
          </Col>

          <Col md="2" className={isContactsPage ? "hidden" : "footer-desktop-col"}>
              <h5 className="footer-title" style={{width: "100%", textAlign: "center"}}>{t("footer.menus.menu1")}</h5>
              <ul className="footer-list">
                  <div className="form-container" style={{ backgroundColor: "transparent" }}>
                      <form onSubmit={handleSubmit}>
                          <div className="form-group">
                              <input type="text" name="firstName" placeholder={t("contact.name")} required onChange={handleChange} />
                              <input type="text" name="lastName" placeholder={t("contact.lastname")} required onChange={handleChange} />
                              <input type="email" name="email" placeholder={t("contact.email")} required onChange={handleChange} />
                          </div>

                          <div className="form-group">
                              <input type="text" name="phonetype" placeholder={t("signup.phone.areacode")} required onChange={handleChange} />
                              <input type="text" name="phoneNumber" placeholder={t("contact.phonenumber")} required onChange={handleChange} />
                              <select name="companyRequest" required onChange={handleChange}>
                                  <option value="">{t("contact.quote.title")}</option>
                                  <option value={t("contact.quote.op1")}>{t("contact.quote.op1")}</option>
                                  <option value={t("contact.quote.op2")}>{t("contact.quote.op2")}</option>
                              </select>
                          </div>

                          <div className="form-group">
                              <select name="learningMethod" required onChange={handleChange}>
                                  <option value="">{t("contact.learningmethod.title")}</option>
                                  <option value={t("contact.learningmethod.op1")}>{t("contact.learningmethod.op1")}</option>
                                  <option value={t("contact.learningmethod.op2")}>{t("contact.learningmethod.op2")}</option>
                              </select>
                              <select name="whoWillTakeCourse" required onChange={handleChange}>
                                  <option value="">{t("contact.whowilltakecourse.title")}</option>
                                  <option value={t("contact.whowilltakecourse.op1")}>{t("contact.whowilltakecourse.op1")}</option>
                                  <option value={t("contact.whowilltakecourse.op2")}>{t("contact.whowilltakecourse.op2")}</option>
                              </select>
                          </div>

                          <div className="form-group">
                              <input type="text" name="city" placeholder={t("contact.location")} required onChange={handleChange} />
                              <input type="text" name="language" placeholder={t("contact.language")} onChange={handleChange} />
                          </div>

                          <button 
                              type="button" 
                              className="toggle-comments-btn" 
                              onClick={() => setShowComments(!showComments)}
                          >
                              {!showComments ? t("contact.footerbtn.state1") : t("contact.footerbtn.state2")}
                          </button>

                          <div className={`comments-container ${showComments ? "visible" : ""}`}>
                              <textarea 
                                  name="comments" 
                                  placeholder={t("contact.comments")} 
                                  className="contact-comments" 
                                  onChange={handleChange}
                              ></textarea>
                          </div>

                          <div className="checkbox-group">
                              <input type="checkbox" id="info" name="receiveInfo" onChange={handleChange} />
                              <label htmlFor="info" style={{ color: "#fff" }}>
                                  {t("contact.checkbox.part1")}{" "}
                                  <strong>UKSA</strong> {t("contact.checkbox.part2")}
                              </label>
                          </div>

                          <button type="submit" className="submit-button">{t("contact.btn")}</button>
                      </form>

                      {isSubmitted && <div className="form-overlay show">{t("contact.sent")}</div>}
                  </div>
              </ul>
          </Col>

          <Col md="2" className='footer-desktop-col'>
              <h5 className="footer-title">{t("footer.menus.menu2")}</h5>
              <ul className="footer-list">
                  <li>
                    <div className="footer-link">
                    <Col md="6" className="footer-social">
                      <a href="/" className="social-icon">
                        <img src={igIcon} alt="Navbar-Icon" style={{height: "40px"}} />
                      </a>
                      <a href="/" className="social-icon">
                        <img src={inIcon} alt="Navbar-Icon" style={{height: "40px"}} />
                      </a>
                      <a href="/" className="social-icon">
                        <img src={xIcon} alt="Navbar-Icon" style={{height: "40px"}} />
                      </a>
                      <a href="/" className="social-icon">
                        <img src={ytIcon} alt="yt-icon" style={{height: "40px"}} />
                      </a>
                    </Col>
                    </div>
                  </li>
              </ul>
              <h5 className="footer-title">{t("footer.menus.menu3")}</h5>
              <ul className="footer-list">
                  <li>
                    <Link to={t("contact.phonelink")} className="footer-link">
                    <Col md="6" className="footer-social" style={{display: "inline-flex", gap: "10px"}}>
                      <FaPhone color="white" size={16} />
                      <div className="social-icon">{t("contact.phone")}</div>
                    </Col>
                    </Link>
                  </li>
              </ul>
            </Col>
        </Row>

        <div className="footer-bottom">
          <Row className='footer-desktop-lower-row'>
            <Col md="6" className="footer-links">
              {Object.entries(footer.policies).map(([key, value]) => (
                <Link key={key} to={value.path} onClick={() => window.scrollTo(0, 0)}>{value.title}</Link>
              ))}
            </Col>
          </Row>
        </div>
      </Container>
    </footer>
  );
};

export default DesktopFooter;
import { useState } from 'react';
import SubPage from 'components/subpage';
import { sendEmail } from 'sender';
import { Template } from 'sender/template';
import { email_sender, quote_title, salesman, salesman_text } from 'components/structures';
import { useTranslation } from 'react-i18next';

function ContactUs() {
    const { t } = useTranslation();
    const [isSubmitted, setIsSubmitted] = useState(false);
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
        <SubPage mode={'contact-container'}>
            <div className="form-container">
                <h2>{t("contact.title")}</h2>
                <a href={t("contact.phonelink")} className="phone-number">{t("contact.phone")}</a>

                <h3>{t("contact.subtitle")}</h3>
                <p>{t("contact.toptext")}</p>
                <p>
                    {t("contact.bottomtext.part1")}{" "}
                    <a href="/politics">{t("contact.bottomtext.part2")}</a> {t("contact.bottomtext.part3")}{" "}
                    <a href="/privacy">{t("contact.bottomtext.part4")}</a>.
                </p>

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

                    <textarea name="comments" placeholder={t("contact.comments")} className="contact-comments" onChange={handleChange}></textarea>

                    <div className="checkbox-group">
                        <input type="checkbox" id="info" name="receiveInfo" onChange={handleChange} />
                        <label htmlFor="info" style={{textAlign: "justify"}}>
                            {t("contact.checkbox.part1")}{" "}
                            <strong>UKSA</strong> {t("contact.checkbox.part2")}
                        </label>
                    </div>
                    <button type="submit" className="submit-button">{t("contact.btn")}</button>
                </form>
                {isSubmitted && <div className="form-overlay show">{t("contact.sent")}</div>}
            </div>
        </SubPage>
    );
}

export default ContactUs;
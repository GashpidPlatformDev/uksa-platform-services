import RegularContent from 'components/subviews';
import React from 'react';
import { useTranslation } from 'react-i18next';

function Courses() {
    const { t } = useTranslation();
    const ourcourses = t("ourcourses", { returnObjects: true });
  return (
    <RegularContent>
        {Object.entries(ourcourses).map(([key, value]) => {
    if (key === "header") {
        return (
            <React.Fragment key={key}>
                <h1 className='regular-title'>{value.title}</h1>
                <p className='regular-text'>{value.text}</p>
            </React.Fragment>
        );
    } else if (key === "body") {
        return (
            <React.Fragment key={key}>
                <h2 className='regular-title'>{value.title}</h2>
                {Object.entries(value).map(([subKey, subValue]) => {
                    if (subKey.startsWith("item")) {
                        return (
                            <div key={subKey} className="course-item">
                                <h3 className="item-subtitle">{subValue.subtitle}</h3>
                                <p className="item-text">{subValue.text}</p>
                                {subValue.items && (
                                    <ul className="coaching-list">
                                        {Object.entries(subValue.items).map(([listKey, listValue]) => (
                                            <li key={listKey}>{listValue}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        );
                    } else if (subKey === "modalities") {
                        return (
                            <div key={subKey} className="modalities-section">
                                <h2 className="modalities-title">{subValue.title}</h2>
                                <p className="modalities-description">{subValue.description}</p>
                                <table className="modalities-table">
                                    <thead>
                                        <tr>
                                            {subValue.table.headers.map((header, i) => (
                                                <th key={i}>{header}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {subValue.table.rows.map((row, i) => (
                                            <tr key={i}>
                                                {row.map((cell, j) => <td key={j}>{cell}</td>)}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <p className="modalities-footer">{subValue.footer}</p>
                                <div className="modalities-contact">
                                    <p>{subValue.contact.text}</p>
                                    <div className="contact-links">
                                        <a href="#form">{subValue.contact.links.form}</a> |
                                        <a href="#whatsapp">{subValue.contact.links.whatsapp}</a>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                    return null;
                })}
            </React.Fragment>
        );
    }
    return null;
})}

    </RegularContent>
  );
}

export default Courses;
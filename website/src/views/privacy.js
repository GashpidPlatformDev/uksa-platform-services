import RegularContent from "components/subviews";
import { useTranslation } from "react-i18next";
import React from "react";

const PrivacyPolicy = () => {
    const { t } = useTranslation();
    const policy = t("privacypolicy", { returnObjects: true });

    return (
        <RegularContent>
            <div className="privacy-container">
                <h1 className="privacy-title">{policy.introduction.title}</h1>
                <p className="privacy-text">{policy.introduction.text}</p>

                <div className="privacy-section">
                    <h2 className="privacy-subtitle">{policy.informationCollection.title}</h2>
                    <p className="privacy-text">{policy.informationCollection.text}</p>

                    <h3 className="privacy-subtitle">{policy.informationCollection.sections.providedInfo.title}</h3>
                    <ul className="privacy-list">
                        {policy.informationCollection.sections.providedInfo.text.map((item, index) => {
                            const parts = item.split(":");
                            return (
                                <li key={index}>
                                    <strong>{parts[0]}:</strong> {parts[1]}
                                </li>
                            );
                        })}
                    </ul>

                    <h3 className="privacy-subtitle">{policy.informationCollection.sections.automaticCollection.title}</h3>
                    <ul className="privacy-list">
                        {policy.informationCollection.sections.automaticCollection.text.map((item, index) => {
                            const parts = item.split(":");
                            return (
                                <li key={index}>
                                    <strong>{parts[0]}:</strong> {parts[1]}
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className="privacy-section">
                    <h2 className="privacy-subtitle">{policy.dataUsage.title}</h2>
                    <p className="privacy-text">{policy.dataUsage.subtitle}</p>
                    <ul className="privacy-list">
                        {policy.dataUsage.text.map((item, index) => {
                            const parts = item.split(":");
                            return (
                                <li key={index}>
                                    <strong>{parts[0]}:</strong> {parts[1]}
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className="privacy-section">
                    <h2 className="privacy-subtitle">{policy.dataSharing.title}</h2>
                    <p className="privacy-text">{policy.dataSharing.subtitle}</p>

                    {Object.entries(policy.dataSharing).map(([key, value], index) => {
                        if (key.includes("item")) {
                            return (
                                <div key={index}>
                                    <h3 className="privacy-subtitle">{value.subtitle}</h3>
                                    {value.subitems ? (
                                        <ul className="privacy-sublist">
                                            {value.subitems.map((subitem, subIndex) => (
                                                <li key={subIndex}>{subitem}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="privacy-text">{value}</p>
                                    )}
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>

                <div className="privacy-section">
                    <h2 className="privacy-subtitle">{policy.sharedInfo.title}</h2>
                    <p className="privacy-text">{policy.sharedInfo.subtitle}</p>
                    <ul className="privacy-list">
                        {policy.sharedInfo.text.map((item, index) => {
                            const parts = item.split(":");
                            return (
                                <li key={index}>
                                    <strong>{parts[0]}:</strong> {parts[1]}
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className="privacy-section">
                    <h2 className="privacy-subtitle">{policy.security.title}</h2>
                    <p className="privacy-text">{policy.security.text}</p>
                </div>

                <div className="privacy-section">
                    <h2 className="privacy-subtitle">{policy.userRights.title}</h2>
                    <p className="privacy-text">{policy.userRights.subtitle}</p>
                    <ul className="privacy-list">
                        {policy.userRights.text.map((item, index) => {
                            const parts = item.split(":");
                            return (
                                <li key={index}>
                                    <strong>{parts[0]}:</strong> {parts[1]}
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className="privacy-section">
                    <h2 className="privacy-subtitle">{policy.internationalTransfers.title}</h2>
                    <p className="privacy-text">{policy.internationalTransfers.text}</p>
                </div>

                <div className="privacy-section">
                    <h2 className="privacy-subtitle">{policy.updates.title}</h2>
                    <p className="privacy-text">{policy.updates.text}</p>
                </div>

                <div className="privacy-contact">
                    <h2 className="privacy-subtitle">{policy.contact.title}</h2>
                    {policy.contact.text.map((item, index) => (
                        <p key={index} className="privacy-text">{item}</p>
                    ))}
                </div>
            </div>
        </RegularContent>
    );
};

export default PrivacyPolicy;
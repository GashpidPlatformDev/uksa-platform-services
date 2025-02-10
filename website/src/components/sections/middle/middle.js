import { laptopImage } from "components/imports/imports";
import RCard from "components/RCard";
import { useTranslation } from "react-i18next";
import React from "react";


const MiddleSection = () => {
    const { t } = useTranslation();
    const middle = t("middle", { returnObjects: true });
    return(
        <>
        <div className="middle-section">
            <div className="middle-header">
                <p className="middle-title">
                    {Object.entries(middle.title).map(([key, value], index) => (
                        index === 1 ? Object.entries(value).map(([key, value], index) => (
                            index === 1 ? <span key={key} className="highlight">{value+" "}</span> : " "+value
                        )) : value
                    ))}
                </p>
            </div>
            <div className="middle-container">
                {Object.entries(middle.cards).map(([key, value]) => (
                    <RCard imageUrl={laptopImage} title={value.title} buttonText={value.button} to={value.path} />
                ))}
            </div>
        </div>
        </>
    )
}

export default MiddleSection;
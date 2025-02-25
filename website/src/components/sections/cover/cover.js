import React from "react";
import CoverVector from "./vector";
import { useTranslation } from "react-i18next";
import { rightArrow, worldIcon } from "components/imports/imports";
import { Link } from "react-router-dom";

const CoverSection = () => {
    const { t } = useTranslation();
    const cover = t("cover", { returnObjects: true });
    return(
        <>
        <div className="cover-section">
            <div className="cover-header">
                <div className="cover-title-container">
                    <h1 className="cover-title">
                        {t("cover.title.top")}
                        <br />
                        {Object.entries(cover.title.middle).map(([key, value], index) => (
                            index === 1 ? <span key={key} className="highlight">{value+" "}</span> : value
                        ))}
                        <br />
                        {t("cover.title.bottom")}
                    </h1>
                    <h2 className="cover-subtitle">
                        {t("cover.subtitle")}
                    </h2>
                </div>
                <CoverVector isTop={true} />
                <div className="cover-title-container-mobile">
                    <h3 className="cover-title-mobile">
                        {t("cover.title.top")+" "}
                        {Object.entries(cover.title.middle).map(([key, value], index) => (
                            index === 1 ? <span key={key} className="highlight">{value+" "}</span> : value
                        ))}
                        {" "+t("cover.title.bottom")}
                    </h3>
                </div>

                <div className="cover-header-ribbon">
                    
                    {Object.entries(cover.ribbon.header).map(([key, value], index) => (
                        <Link key={key} to={value.path} className={index === 0 ? "cover-rounded-button": "cover-world-button"}>
                            {index === 1 ? <img src={worldIcon} alt="cover-world-icon" className="cover-world" /> : ""}
                            {value.title}
                            {index === 0 ? <img src={rightArrow} alt="cover-arrow-icon" className="cover-arrow" /> : ""}
                        </Link>
                    ))}
                </div>
            </div>

            <div className="cover-middle-ribbon">
                {Object.entries(cover.ribbon.middle).map(([key, value], index, array) => {
                    const isLast = index === array.length - 1;
                    return (
                        <Link 
                            to={value.path} 
                            className={isLast ? "cover-bisel-r-button" : index === 0 ? "cover-bisel-l-button" : "cover-rect-button"}
                            key={key}
                            >
                            {value.title}
                        </Link>
                    )
                })}
            </div>

            {<div className="cover-bottom">
                <div className="cover-bottom-container">

                    {Object.entries(cover.bottom).map(([key, value], index, array) => {
                        const isLast = index === array.length - 1;
                        return (
                            <div key={`${key}-${index}`}>
                                {!isLast ? (
                                    <div className={index === 0 ? "cover-bottom-title" : "cover-text"}>
                                        {value}
                                    </div> ) : (
                                    <Link to={value.path} className="cover-bottom-button">
                                        {value.title}
                                        <img src={rightArrow} alt="cover-arrow-icon" className="cover-arrow" />
                                    </Link>
                                )}
                            </div>
                        );
                    })}
                </div>
                {<CoverVector isTop={false} />}
            </div>}
        </div>
        </>
    )
}

export default CoverSection;
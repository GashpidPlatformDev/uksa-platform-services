import RegularContent from "components/subviews";
import React from "react";
import { useTranslation } from "react-i18next";

const Workshops = () => {
    const { t } = useTranslation();
    const workshops = t("workshops", { returnObjects: true });

    return (
        <RegularContent>
            <section className="workshops-section">
                <h2 className="workshops-title">{workshops.header.title}</h2>
                <p className="workshops-description">{workshops.header.text}</p>
                
                <div className="workshops-container">
                    {workshops.body.items.map((workshop, index) => (
                        <div className="workshop-card" key={index}>
                            <img 
                                src={require(`assets/media/images/${workshop.image}`)} 
                                alt={workshop.subtitle} 
                                className="workshop-image"
                            />
                            <h3 className="workshop-subtitle">{workshop.subtitle}</h3>
                            <p className="workshop-text">{workshop.text}</p>
                        </div>
                    ))}
                </div>
            </section>
        </RegularContent>
    );
};

export default Workshops;
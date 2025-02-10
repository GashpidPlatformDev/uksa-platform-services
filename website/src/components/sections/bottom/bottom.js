import React, { useState} from 'react';
import { laptopImage } from 'components/imports/imports';
import RCard from 'components/RCard';
import { useTranslation } from "react-i18next";

const BottomSection = () => {
    const { t } = useTranslation();
    const middle = t("middle", { returnObjects: true });

    const items = [
        <div>Elemento 1</div>,
        <div>Elemento 2</div>,
        <div>Elemento 3</div>,
        <div>Elemento 4</div>,
      ];

      const [currentIndex, setCurrentIndex] = useState(0);

      const nextItem = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
      };
    
      const prevItem = () => {
        setCurrentIndex((prevIndex) =>
          prevIndex === 0 ? items.length - 1 : prevIndex - 1
        );
      };

    return (

        <div className='bottom-section'>
            <div className="carousel-container">
        <button className="carousel-button prev" onClick={prevItem}>
            &#8249;
        </button>

        <div
            className="carousel-items"
            style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            }}
        >
            {items.map((item, index) => (
            <div
                key={index}
                className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
            >
                {item}
            </div>
            ))}
        </div>

        <button className="carousel-button next" onClick={nextItem}>
            &#8250;
        </button>
            </div>
        </div>
    );
};

export default BottomSection;

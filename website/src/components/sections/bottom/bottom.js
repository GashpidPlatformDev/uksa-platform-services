import RCard from "components/RCard";
import { useTranslation } from "react-i18next";
import React, { useEffect, useRef, useState } from "react";


const MiddleSection = () => {
    const { t } = useTranslation();
    const witness = t("witness", { returnObjects: true });

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [itemsWidth, setItemsWidth] = useState(0);
    const [startX, setStartX] = useState(0);
    const [deltaX, setDeltaX] = useState(0);
    const containerRef = useRef(null);

    useEffect(() => {
        const updateWidth = () => {
          const carouselItem = document.querySelector(".carousel-items-variant");
    
          if (carouselItem) {
            const parent = carouselItem.parentElement;
            const style = window.getComputedStyle(carouselItem);
            
            const widthPx = parseFloat(style.getPropertyValue("width"));
            const parentWidthPx = parent ? parseFloat(window.getComputedStyle(parent).getPropertyValue("width")) : 1;
    
            const percentage = ((widthPx*100)/(parentWidthPx));

            console.log(percentage)
            
            if(percentage > 88) {
                setItemsWidth((100-percentage)+percentage+9.5);
            } else if(percentage > 48 && percentage < 60) {
                setItemsWidth((100-percentage+15));
            } else if(percentage < 46) {
                setItemsWidth(percentage+9.5);
            }
          }
        };
    
        updateWidth();
    
        window.addEventListener("resize", updateWidth);
    
        return () => {
          window.removeEventListener("resize", updateWidth);
        };
      }, []);
    
    const totalItems = Object.entries(witness.items).length;

    const nextItem = () => {
        setCurrentIndex((prevIndex) => (prevIndex < totalItems - 1 ? prevIndex + 1 : prevIndex));
    };

    const prevItem = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    };

    const handleStart = (clientX) => {
        setIsDragging(true);
        setStartX(clientX);
    };

    const handleMove = (clientX) => {
        if (!isDragging) return;
        setDeltaX(clientX - startX);
    };

    const handleEnd = () => {
        if (isDragging) {
            if (deltaX < -50 && currentIndex < totalItems - 1) {
                nextItem(); // Desplazamiento a la izquierda → siguiente
            } else if (deltaX > 50 && currentIndex > 0) {
                prevItem(); // Desplazamiento a la derecha → anterior
            }
        }
        setIsDragging(false);
        setDeltaX(0);
    };

    return(
        <>
        <div className="bottom-section">
            <div className="middle-header">
                <div className="middle-title" style={{marginTop: "1.5rem",color: "#194866"}}>
                    {t("witness.title")}
                </div>
            </div>
            <div className="carousel-container">
                <button 
                    className="carousel-button prev" 
                    onClick={prevItem}
                    disabled={currentIndex === 0}
                >
                    &#8249;
                </button>

                <div
                    className="carousel-items-variant"
                    style={{
                        transform: `translateX(calc(-${currentIndex * itemsWidth}% + ${deltaX}px))`,
                        cursor: isDragging ? "grabbing" : "grab",
                        transition: isDragging ? "none" : "transform 0.3s ease-out",
                        userSelect: "none",
                    }}
                    ref={containerRef}
                    onMouseDown={(e) => handleStart(e.clientX)}
                    onMouseMove={(e) => handleMove(e.clientX)}
                    onMouseUp={handleEnd}
                    onMouseLeave={handleEnd}
                    onTouchStart={(e) => handleStart(e.touches[0].clientX)}
                    onTouchMove={(e) => handleMove(e.touches[0].clientX)}
                    onTouchEnd={handleEnd}
                >
                    
                    {Object.entries(witness.items).map(([key, value], index) => (
                        <div
                            key={key}
                            className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
                        >
                            <RCard 
                                imageUrl={require(`assets/media/images/${value.image}`)}
                                bottomName={value.name}
                                bottomJob={value.job}
                                title={value.title} 
                                bottomText={value.text} 
                            />
                        </div>
                    ))}
                </div>

                <button 
                    className="carousel-button next" 
                    onClick={nextItem}
                    disabled={currentIndex === totalItems - 1}
                >
                    &#8250;
                </button>
            </div>
        </div>
        </>
    )
}

export default MiddleSection;
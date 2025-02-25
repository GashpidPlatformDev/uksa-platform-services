import { languagesPortrait } from "components/imports/imports";
import RCard from "components/RCard";
import { useTranslation } from "react-i18next";
import React, { useRef, useState } from "react";


const MiddleSection = () => {
    const { t } = useTranslation();
    const middle = t("middle", { returnObjects: true });

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [deltaX, setDeltaX] = useState(0);
    const containerRef = useRef(null);
    
    const totalItems = Object.entries(middle.cards).length;

    // Avanzar solo si no es el último elemento
    const nextItem = () => {
        setCurrentIndex((prevIndex) => (prevIndex < totalItems - 1 ? prevIndex + 1 : prevIndex));
    };

    // Retroceder solo si no es el primer elemento
    const prevItem = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    };

    // Inicia el arrastre (PC y móviles)
    const handleStart = (clientX) => {
        setIsDragging(true);
        setStartX(clientX);
    };

    // Maneja el movimiento del cursor/touch
    const handleMove = (clientX) => {
        if (!isDragging) return;
        setDeltaX(clientX - startX);
    };

    // Finaliza el arrastre y decide si cambiar de slide
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
            <div className="carousel-container">
                <button 
                    className="carousel-button prev" 
                    onClick={prevItem}
                    disabled={currentIndex === 0} // Deshabilita si es el primero
                >
                    &#8249;
                </button>

                <div
                    className="carousel-items"
                    style={{
                        transform: `translateX(calc(-${currentIndex * 88}% + ${deltaX}px))`,
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
                    {Object.entries(middle.cards).map(([_, value], index) => (
                        <div
                            key={index}
                            className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
                        >
                            <RCard imageUrl={languagesPortrait[index]} title={value.title} buttonText={value.button} to={value.path} />
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
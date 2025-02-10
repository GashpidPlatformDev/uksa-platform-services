import { useEffect, useState } from "react";
import DesktopFooter from "./desktop-footer";
import MobileFooter from "./mobile-footer";

const Footer = () => {
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1024);

    useEffect(() => {
        // Función para verificar el tamaño de la ventana
        const handleResize = () => {
        setIsSmallScreen(window.innerWidth < 1024);
        };

        // Agregar el event listener
        window.addEventListener('resize', handleResize);

        // Ejecutar la función una vez para verificar al cargar el componente
        handleResize();

        // Limpieza al desmontar el componente
        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);
    return(
        <>
        {isSmallScreen ? <MobileFooter /> : <DesktopFooter />}
        </>
    )
}

export default Footer;
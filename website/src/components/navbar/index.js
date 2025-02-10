import MobileNavbar from "./mobile-navbar";
import { useEffect, useState } from "react";
import DesktopNavbar from "./desktop-navbar";
import { useTranslation } from "react-i18next";

const Navbar = () => {
    const { t } = useTranslation();
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1024);
    const [currentLang, setCurrentLang] = useState(t("navbar.langs.item-1"))

    useEffect(() => {
        const handleResize = () => {
        setIsSmallScreen(window.innerWidth < 1024);
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);
    return(
        <>
        {isSmallScreen ? <MobileNavbar setCurrentLang={setCurrentLang} /> : 
        <DesktopNavbar currentLang={currentLang} setCurrentLang={setCurrentLang} />}
        </>
    )
}

export default Navbar;
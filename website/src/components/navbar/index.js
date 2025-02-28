import MobileNavbar from "./mobileNavbar";
import { useEffect, useState } from "react";
import DesktopNavbar from "./desktopNavbar";
import { useTask } from "context/TaskContext";

const Navbar = () => {
    const { language, setLanguage } = useTask();
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1024);

    console.log(language)

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
        {isSmallScreen ? <MobileNavbar setCurrentLang={setLanguage} /> : 
        <DesktopNavbar currentLang={language} setCurrentLang={setLanguage} />}
        </>
    )
}

export default Navbar;
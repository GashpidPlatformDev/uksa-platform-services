import { /*iconGoogle, iconMicrosoft, */navbarIcon } from 'components/imports/imports';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useTask } from 'context/TaskContext';
import SubPage from 'components/subpage';
import { client } from 'schema/client';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function LogIn() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const {updateProfile} = useTask();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await client.auth.signInWithPassword({
            email: username,
            password: password
        }).then((resp) => {
            if(!resp.error){
                updateProfile();
                navigate(t("login.dashboard.path"));
            }
        })
    };
    
    return (
        <SubPage mode={'login'}>
            <div className="auth-container">
                <img src={navbarIcon} alt="auth-Icon" className="auth-logo" />
                <h2 className='auth-title'>{t("navbar.single-menu-3.title")}</h2>
                <form className='auth-form' onSubmit={handleSubmit}>
                    <input 
                        className='auth-input' 
                        type="text" 
                        placeholder={t("login.usr")} 
                        value={username} 
                        onChange={handleUsernameChange} 
                        required 
                    />
                    <input 
                        className='auth-input' 
                        type="password" 
                        placeholder={t("login.pswd")} 
                        value={password} 
                        onChange={handlePasswordChange} 
                        required 
                    />
                    <Link to='' className="auth-forgot-password">{t("login.lost")}</Link>
                    <button type="submit" className="auth-button">{t("login.dashboard.title")}</button>
                </form>
                {/*
                <p>{t("login.otherlogin")}</p>
                <div className="social-login">
                    <button className="auth-google">
                        <img src={iconGoogle} alt="google-Icon" className="auth-icon-google" />
                        Google
                    </button>
                    <button className="auth-microsoft">
                        <img src={iconMicrosoft} alt="microsoft-Icon" className="auth-icon-microsoft" />
                        Microsoft
                    </button>
                </div>
                */}
                <p className="auth-register">{t("login.signup")}</p>
                <Link to={t("login.signupbtn.path")} style={{ width: "100%" }}>
                    <button className="auth-register-button">{t("login.signupbtn.title")}</button>
                </Link>
            </div>
        </SubPage>
    );
}

export default LogIn;

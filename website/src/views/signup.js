import { navbarIcon } from 'components/imports/imports';
import { useTranslation } from "react-i18next";
import { client } from 'schema/client';
import SubPage from 'components/subpage';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function SignUp() {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [areaCode, setAreaCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [windowMode, setWindowMode] = useState(false);
    const [repeatPassword, setRepeatPassword] = useState('');
    const [passwordMismatch, setPasswordMismatch] = useState(false);

    const handleChange = (setter) => (e) => setter(e.target.value);

    const handleNumericChange = (setter) => (e) => {
      const value = e.target.value.replace(/\D/g, '');
      setter(value);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
        
      if (password !== repeatPassword) {
        setPassword('');
        setRepeatPassword('');
        setPasswordMismatch(true);
        return;
      }

      const { data, error } = await client
      .auth.signUp({
        email: email,
        password: password
      });

      console.log("auth: ",data,error)

      if (!error && data?.user) {
        const userId = data.user.id;
        console.log("test: ", userId)
        await client.from("pending_profiles").insert([
          {
            id: userId,
            email: email,
            name: firstName,
            phone: phoneNumber,
            lastname: lastName,
            areacode: areaCode,
          },
        ]);

        console.log("update: ")
        setWindowMode(true);
      }
    };

    return (
        <SubPage mode={'login'}>
            <div className="auth-container">
              {windowMode ?
                <>
                <h2>{t("signup.context.title")}</h2>
                <p style={{textAlign: "justify"}}>{t("signup.context.text")}</p>
                <Link to={t("signup.context.btn.path")} className="auth-forgot-password">{t("signup.context.btn.title")}</Link>
                </>
                :
                <>
                <img src={navbarIcon} alt="auth-Icon" className="auth-logo" />
                <h2 className='auth-title'>{t("signup.title")}</h2>
                <form className='login-form' onSubmit={handleSubmit}>
                    <input 
                        className='auth-input' 
                        type="text" 
                        placeholder={t("signup.name")} 
                        value={firstName} 
                        onChange={handleChange(setFirstName)} 
                        required 
                    />

                    <input 
                        className='auth-input' 
                        type="text" 
                        placeholder={t("signup.lastname")} 
                        value={lastName} 
                        onChange={handleChange(setLastName)} 
                        required 
                    />

                    <input 
                        className='auth-input' 
                        type="email" 
                        placeholder={t("signup.email")} 
                        value={email} 
                        onChange={handleChange(setEmail)} 
                        required 
                    />

                    <div className='auth-phone-container'>
                      <input
                        className='auth-input-phone-code' 
                        type="text" 
                        placeholder={t("signup.phone.areacode")} 
                        value={areaCode} 
                        onChange={handleNumericChange(setAreaCode)} 
                        required 
                      />

                      <input 
                        className='auth-input-phone' 
                        type="text" 
                        placeholder={t("signup.phone.title")} 
                        value={phoneNumber} 
                        onChange={handleNumericChange(setPhoneNumber)} 
                        required 
                      />
                    </div>
                    
                    <input 
                        className='auth-input' 
                        type="password" 
                        placeholder={passwordMismatch ? t("signup.pswd.mismatch") : t("signup.pswd.placeholder")}  
                        value={password} 
                        onChange={handleChange(setPassword)} 
                        required 
                    />

                    <input 
                        className='auth-input' 
                        type="password" 
                        placeholder={passwordMismatch ? t("signup.pswd.mismatch") : t("signup.rpswd")}  
                        value={repeatPassword} 
                        onChange={handleChange(setRepeatPassword)} 
                        required 
                    />

                    <Link to={t("signup.back.path")} className="auth-forgot-password">{t("signup.back.title")}</Link>
                    <button type="submit" className="auth-button">{t("signup.btn")}</button>
                </form>
                </>
              }
            </div>
        </SubPage>
    );
}

export default SignUp;
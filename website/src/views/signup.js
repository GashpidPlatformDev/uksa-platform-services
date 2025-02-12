import { useState } from 'react';
import { navbarIcon } from 'components/imports/imports';
import SubPage from 'components/subpage';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { client } from 'supabase/client';

function SignUp() {
    const { t } = useTranslation();

    // Estados para almacenar los valores de los inputs
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneType, setPhoneType] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [passwordMismatch, setPasswordMismatch] = useState(false);

    // Manejar el cambio en los inputs
    const handleChange = (setter) => (e) => setter(e.target.value);

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita que la página se recargue
        
        if (password !== repeatPassword) {
            setPassword('');
            setRepeatPassword('');
            setPasswordMismatch(true);
            return;
        }

        ////

        const { data, error } = await client.auth.signUp({
            email: email,
            password: password
          });
          
          if (error) {
            console.error("Error en el registro:", error.message);
          } else if (data?.user) {
            const userId = data.user.id;
          
            // Esperar hasta que el perfil haya sido insertado en la tabla "profile"
            let retries = 5; // Intentos máximos
            let profileExists = false;
          
            while (retries > 0 && !profileExists) {
              const { data: profileData } = await client
                .from("profile")
                .select("id")
                .eq("id", userId)
                .single();
          
              if (profileData) {
                profileExists = true;
                break;
              }
              await new Promise((resolve) => setTimeout(resolve, 500)); // Espera 500ms antes de reintentar
              retries--;
            }
          
            if (!profileExists) {
              console.error("Error: el perfil no se insertó a tiempo.");
              return;
            }
          
            // Ahora actualizamos el perfil porque ya existe
            const { error: updateError } = await client
              .from("profile")
              .update({
                name: firstName,
                lastname: lastName,
                phonetype: phoneType === "op1" ? true : false,
                phone: phoneNumber,
                areacode: 57
              })
              .eq("id", userId);
          
            if (updateError) {
              console.error("Error al actualizar el perfil:", updateError.message);
            } else {
              console.log("Perfil actualizado correctamente");
            }
          }
           

        //#

        console.log("Nombre:", firstName);
        console.log("Apellido:", lastName);
        console.log("Correo:", email);
        console.log("Teléfono:", phoneType, phoneNumber);
        console.log("Contraseña:", password);

        // Aquí puedes agregar la lógica para registrar al usuario
    };

    return (
        <SubPage mode={'login'}>
            <div className="auth-container">
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
                        <select value={phoneType} onChange={handleChange(setPhoneType)} required>
                            <option value="">{t("signup.phone.type.default")}</option>
                            <option value="op1">{t("signup.phone.type.op1")}</option>
                            <option value="op2">{t("signup.phone.type.op2")}</option>
                        </select>
                        <input 
                            className='auth-input-phone' 
                            type="text" 
                            placeholder={t("signup.phone.title")} 
                            value={phoneNumber} 
                            onChange={handleChange(setPhoneNumber)} 
                            required 
                        />
                    </div>
                    
                    <input 
                        className='auth-input' 
                        type="password" 
                        placeholder={passwordMismatch ? t("signup.pswd.mismatch") : t("signup.pswd")}  
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
                    <button type="submit" className="auth-button">{t("signup.btn.title")}</button>
                </form>
            </div>
        </SubPage>
    );
}

export default SignUp;
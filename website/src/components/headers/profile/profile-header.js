import { man1Icon, man2Icon, userProfile, woman1Icon, woman2Icon } from "components/imports/imports";
import { defaultAvatart, table } from "components/structures";
import AvatarUpload from "components/utils/AvatarUpload";
import React, { useCallback, useEffect, useState } from "react";
import { fetchUserAvatar } from "schema/storage";
import { useTranslation } from "react-i18next";
import { useTask } from "context/TaskContext";
import { client } from "schema/client";

function ProfilePageHeader() {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [areaCode, setAreaCode] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    
    const [firstName, setFirstName] = useState('');
    const [userName, setUserName] = useState(null);
    const [activeTab, setActiveTab] = useState("1");
    const [phoneNumber, setPhoneNumber] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [isAvatarUpload, setIsAvatarUpload] = useState(false);
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const { profile, userId, avatarUrl, setAvatarUrl, /*courseUrl, courseId, setCourseId, setCourseUrl,*/ updateProfile } = useTask();
    

    /*const updateDefaultCoursePortrait = async (fileName) => {
        await client.from("courses").update({ avatar: fileName }).eq("id", courseId);
        setCourseUrl(defaultFlag[fileName])
    }*/

    const handleNumericChange = (setter) => (e) => {
        const value = e.target.value.replace(/\D/g, '');
        setter(value);
      };

    const loadAvatar = useCallback( async () => {
        const fileName = profile?.data[0]?.avatar;
        const rol = profile?.data[0]?.rol;

        if(rol === true) setActiveTab("2");
        else if(rol === false) setActiveTab("1");
        else setActiveTab("1");
        try {
            if(fileName) {
                console.log(fileName, userId)
                if(fileName.split(".")[0] === userId) {
                    /*const url = */await fetchUserAvatar(userId, fileName)
                    .then((url) => {
                        setAvatarUrl(url);
                    })
                }
                else {
                    setAvatarUrl(defaultAvatart[fileName]);
                }
            }
        }
        catch (e) {
            throw e;
        }
    },[profile?.data, userId, setAvatarUrl, setActiveTab]);

    useEffect(() => {
        if(profile?.data[0]) {
            const name = profile?.data[0]?.name.split(" ");
            const phoneNumber = profile?.data[0]?.phone;
            const lastName = profile?.data[0]?.lastname;
            const areacode = profile?.data[0]?.areacode;
            const firstName = profile?.data[0]?.name;
            const email = profile?.data[0]?.email;
            setPhoneNumber(phoneNumber);
            setFirstName(firstName);
            setLastName(lastName);
            setAreaCode(areacode);
            setUserName(name);
            setEmail(email);
            loadAvatar();
        }

    },[profile, loadAvatar]);

    useEffect(() => {
        if(isAvatarUpload) loadAvatar();
    },[isAvatarUpload, loadAvatar]);

    /* section update profile */
    const handleChange = (setter) => (e) => setter(e.target.value);

    const updateDefaultAvatar = async (fileName) => {
        await client.from(table).update({ avatar: fileName }).eq("id", userId);
        setAvatarUrl(defaultAvatart[fileName])
    }

    async function updateProfileData(){
        try {
            const { error: profileError } = await client
                .from(table)
                .update({
                    name: firstName,
                    lastname: lastName,
                    phone: phoneNumber,
                    areacode: areaCode
                })
                .eq("id", userId);
                    
            if (profileError) throw profileError;
            updateProfile();
        }
        catch (error) {
            throw error;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (password !== repeatPassword) {
            setPasswordMismatch(true);
            setRepeatPassword('');
            updateProfileData();
            setPassword('');
        }
        else {
            try {
                await client.auth.updateUser({ email, password });
                updateProfileData();
            } catch (error) {
                throw error;
            }
        }
    };

  /*const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Función para manejar el envío del formulario
  const handleSubmitCourse = async (event) => {
    event.preventDefault(); // Evita que la página se recargue

    const { data, error } = await client
        .from('courses')
        .insert([
            { title: title, description: description },
        ])
        .select()

    if(!error) {

    }
    

    console.log("Course insert", data, error);
  };*/

    return (
        <>
        <div className="profile-portrait-container">
            <img src={require("assets/img/bg5.jpg")} alt="profile-portrait" className="profile-portrait" />
            <div className="portrait-overlay"></div>
            <div className="profile-avatar">
                <img alt="..." className="img-circle img-responsive" src={avatarUrl ? avatarUrl : userProfile} />
                <div className="avatar-overlay" onClick={() => setIsOpen(!isOpen)} />
                <div className="name">
                    <h3 className="title">{userName ? userName : "Please update your profile data"}</h3>
                </div>
            </div>
            {/*<div className="profile-ribbon">
                <div>
                    <h2 className="stat">26</h2>
                    <p className="stat-title">Comments</p>
                </div>
                <div>
                    <h2 className="stat">26</h2>
                    <p className="stat-title">Comments</p>
                </div>
                <div>
                    <h2 className="stat">48</h2>
                    <p className="stat-title">Bookmarks</p>
                </div>
            </div>*/}
            <div className="tab-content">
                {activeTab === "1" && (
                null
                )}
                {activeTab === "2" && (
                null
                )}
            </div>
            <div className={`profile-settings ${isOpen ? "open" : ""}`}>
                <div className="settings-title">
                    <h2 className='auth-title' style={{color: "#665"}}>{t("profile.settings.title")}</h2>
                    <p style={{width: "80%", textAlign: "justify"}}>{t("profile.settings.text")}</p>
                </div>
                <div className="update-profile">
                    <div className="auth-container" style={{background: "transparent"}}>
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
                                readOnly={true}
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
                            />

                            <input 
                                className='auth-input' 
                                type="password" 
                                placeholder={passwordMismatch ? t("signup.pswd.mismatch") : t("signup.rpswd")}  
                                value={repeatPassword} 
                                onChange={handleChange(setRepeatPassword)} 
                            />
                            <button type="submit" className="auth-button">{t("profile.settings.btn1")}</button>
                        </form>
                    </div>
                </div>
                <div className="upload-avatar">
                    <AvatarUpload 
                        currentAvatar={avatarUrl ? avatarUrl : userProfile} 
                        onAvatarUpload={setIsAvatarUpload} 
                    />
                    <div className="card" style={{width:"40%"}} onClick={() => updateDefaultAvatar("man1")}>
                        <img src={man1Icon} alt={"..."} className="card-img" />
                    </div>
                    <div className="card" style={{width:"40%"}} onClick={() => updateDefaultAvatar("woman1")}>
                        <img src={woman1Icon} alt={"..."} className="card-img" />
                    </div>
                    <div className="card" style={{width:"40%"}} onClick={() => updateDefaultAvatar("woman2")}>
                        <img src={woman2Icon} alt={"..."} className="card-img" />
                    </div>
                    <div className="card" style={{width:"40%"}} onClick={() => updateDefaultAvatar("man2")}>
                        <img src={man2Icon} alt={"..."} className="card-img" />
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default ProfilePageHeader;

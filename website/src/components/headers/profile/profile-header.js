import { brazilFlag, franceFlag, germanFlag, man1Icon, man2Icon, spainFlag, ukFlag, userProfile, woman1Icon, woman2Icon } from "components/imports/imports";
import React, { useEffect, useState } from "react";
import { fetchUserAvatar } from "supabase/storage";
import ImageUpload from "supabase/imageUpload";
import { useTranslation } from "react-i18next";
import { useTask } from "context/TaskContext";
import { client } from "supabase/client";

const defaultAvatart = { 
    "man1": man1Icon, 
    "man2": man2Icon, 
    "woman1": woman1Icon, 
    "woman2": woman2Icon 
}

const defaultFlag = { 
    "uk": ukFlag, 
    "german": germanFlag, 
    "brazil": brazilFlag, 
    "france": franceFlag,
    "default": spainFlag 
}

function ProfilePageHeader() {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [phoneType, setPhoneType] = useState('');
    const [userName, setUserName] = useState(null);
    const [activeTab, setActiveTab] = useState("1");
    const [phoneNumber, setPhoneNumber] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [isAvatarUpload, setIsAvatarUpload] = useState(false);
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const { profile, userId, avatarUrl, setAvatarUrl, courseUrl, courseId, setCourseId, setCourseUrl, updateProfile } = useTask();
    

    const updateDefaultCoursePortrait = async (fileName) => {
        await client.from("courses").update({ avatar: fileName }).eq("id", courseId);
        setCourseUrl(defaultFlag[fileName])
    }

    const loadAvatar = async () => {
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
        
    };

    useEffect(() => {
        if(profile?.data[0]) {
            const name = profile?.data[0]?.name.split(" ");
            const lastName = profile?.data[0]?.lastname;
            const phoneNumber = profile?.data[0]?.phone;
            const firstName = profile?.data[0]?.name;
            const email = profile?.data[0]?.email;
            setPhoneNumber(phoneNumber);
            setFirstName(firstName);
            setLastName(lastName);
            setUserName(name);
            setEmail(email);
            loadAvatar();
        }

    },[profile]);

    useEffect(() => {
        if(isAvatarUpload) loadAvatar();
    },[isAvatarUpload]);

    /* section update profile */
    const handleChange = (setter) => (e) => setter(e.target.value);

    const updateDefaultAvatar = async (fileName) => {
        await client.from("profile").update({ avatar: fileName }).eq("id", userId);
        setAvatarUrl(defaultAvatart[fileName])
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (password !== repeatPassword) {
            setPasswordMismatch(true);
            setRepeatPassword('');
            setPassword('');
            return;
        }

        try {
            await client.auth.updateUser({
                email,
                password
            }).then(async (data, error) => {
                if (error) throw error;
                console.log("User Updated: ",data,error)

            if (data?.data?.user) {
                const { error: profileError } = await client
                    .from("profile")
                    .update({
                        name: firstName,
                        lastname: lastName,
                        phonetype: phoneType === "op1",
                        phone: phoneNumber,
                        areacode: 57
                    })
                    .eq("id", userId);
                    
                    if (profileError) throw profileError;
                    updateProfile();
                }
            });
        } catch (err) {
            console.error("Error en el registro o actualización:", err.message);
        }
    };

    const [title, setTitle] = useState("");
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
  };

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
                <div className="course-form">
                {/* Sección del retrato del curso */}
                <div className="course-portrait">
                    <ImageUpload currentImage={
                        courseUrl ? courseUrl : spainFlag}
                        onImageUpload={setCourseId} 
                        idMatch={courseId}
                        bucket="courses"
                        customPath=""
                    />
                    <div className="card" style={{width:"40%"}} onClick={() => updateDefaultCoursePortrait("uk")}>
                        <img src={ukFlag} alt={"..."} className="card-img" />
                    </div>
                    <div className="card" style={{width:"40%"}} onClick={() => updateDefaultCoursePortrait("german")}>
                        <img src={germanFlag} alt={"..."} className="card-img" />
                    </div>
                     <div className="card" style={{width:"40%"}} onClick={() => updateDefaultCoursePortrait("brazil")}>
                        <img src={brazilFlag} alt={"..."} className="card-img" />
                    </div>
                    <div className="card" style={{width:"40%"}} onClick={() => updateDefaultCoursePortrait("france")}>
                        <img src={franceFlag} alt={"..."} className="card-img" />
                    </div>
                </div>
          
                {/* Sección del título y descripción */}
                <form onSubmit={handleSubmitCourse}>
                    <div className="course-info">
                        <label className="course-label">Course title</label>
                        <input
                        type="text"
                        placeholder="Text area title"
                        className="course-input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} // Actualiza el estado
                        />

                        <label className="course-label">Course description</label>
                        <textarea
                        placeholder="Text area description"
                        className="course-textarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} // Actualiza el estado
                        ></textarea>

                        {/* Botón de enviar */}
                        <button type="submit" className="auth-button">Submit</button>
                    </div>
                </form>
              </div>
                )}
            </div>
            <div className={`profile-settings ${isOpen ? "open" : ""}`}>
                <div className="settings-title">
                    <h2 className='auth-title' style={{color: "#665"}}>{t("profile.settings.title")}</h2>
                    <p style={{width: "80%"}}>{t("profile.settings.text")}</p>
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
                            <button type="submit" className="auth-button">{t("profile.settings.btn1")}</button>
                        </form>
                    </div>
                </div>
                <div className="upload-avatar">
                    <ImageUpload 
                        currentImage={avatarUrl ? avatarUrl : userProfile} 
                        onImageUpload={setIsAvatarUpload} 
                        bucket="profile"
                        idMatch={userId}
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

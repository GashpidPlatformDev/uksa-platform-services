import { createContext, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { client } from "schema/client";

export const TaskContext = createContext()

export const useTask = () => {
    const context = useContext(TaskContext)
    if(!context) throw new Error('useTask must be use whithin a TaskContextProvider')
    return context
}

export const TaskContextProvider = ({children}) => {
    const { t } = useTranslation();
    const [userId, setUserId] = useState(null);
    const [profile, setProfile] = useState(null);
    const [courseId, setCourseId] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [courseUrl, setCourseUrl] = useState(null);
    const [language, setLanguage] = useState(t("navbar.langs.item-1"));

    async function updateProfile() {
        try {
            const { data: { user } } = await client.auth.getUser()
            await client
            .from('profile')
            .select('*')
            .eq('id', user?.id)
            .then((data, error) => {
                if(!error) setProfile(data)
            })
        }
        catch {}
        
    }

    async function logOut() {
        setCourseUrl(null);    
        setAvatarUrl(null);
        setCourseId(null);
        setProfile(null);
        setUserId(null);
    }

    return <TaskContext.Provider value={
        {
            userId, 
            profile, 
            courseId,
            language,
            avatarUrl, 
            courseUrl,
            updateProfile,
            setCourseUrl,
            setAvatarUrl,
            setCourseId,
            setLanguage,
            setUserId,
            logOut,
        }
    }>
        {children}
    </TaskContext.Provider>
}
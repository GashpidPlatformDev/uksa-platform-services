import { brazilFlag, franceFlag, germanFlag, man1Icon, man2Icon, spainFlag, ukFlag, woman1Icon, woman2Icon } from "components/imports/imports";

export const salesman_text = process.env.REACT_APP_SALESMAN_TEXT;
export const user_courses = process.env.REACT_APP_USER_COURSES;
export const email_sender = process.env.REACT_APP_EMAIL_SENDER;
export const webmail_usr = process.env.REACT_APP_WEBMAIL_USR;
export const user_bucket = process.env.REACT_APP_USER_BUCKET;
export const quote_title = process.env.REACT_APP_QUOTE_TITLE;
export const web_bucket = process.env.REACT_APP_WEB_BUCKET;
export const salesman = process.env.REACT_APP_SALESMAN;
export const table = process.env.REACT_APP_USER_TABLE;
export const api_key = process.env.REACT_APP_API_KEY;
export const api_url = process.env.REACT_APP_API_URL;

export const defaultAvatart = { 
    "man1": man1Icon, 
    "man2": man2Icon, 
    "woman1": woman1Icon, 
    "woman2": woman2Icon 
}

export const defaultFlag = { 
    "uk": ukFlag, 
    "german": germanFlag, 
    "brazil": brazilFlag, 
    "france": franceFlag,
    "default": spainFlag 
}
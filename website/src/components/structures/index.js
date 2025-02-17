import { 
    brazilFlag, 
    franceFlag, 
    germanFlag, 
    man1Icon, 
    man2Icon, 
    spainFlag, 
    ukFlag, 
    woman1Icon, 
    woman2Icon
} from "components/imports/imports";

export const user_courses = process.env.REACT_APP_USER_COURSES;
export const user_bucket = process.env.REACT_APP_USER_BUCKET;
export const web_bucket = process.env.REACT_APP_WEB_BUCKET;
export const table = process.env.REACT_APP_USER_TABLE;

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
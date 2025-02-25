import RCardMod from "./rcard";

const RCard = ({ imageUrl, title, buttonText, bottomText, bottomName, bottomJob, to }) => {
    return(
        <RCardMod 
            buttonText={buttonText} 
            bottomText={bottomText} 
            bottomName={bottomName} 
            bottomJob={bottomJob} 
            imageUrl={imageUrl} 
            title={title} 
            to={to} 
        />        
    )
}

export default RCard;
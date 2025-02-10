import RCardMod from "./rcard";

const RCard = ({ imageUrl, title, buttonText, to }) => {
    return(
        <RCardMod imageUrl={imageUrl} title={title} buttonText={buttonText} to={to} />        
    )
}

export default RCard;
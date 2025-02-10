import { Link } from "react-router-dom";

const RCardMod = ({ imageUrl, title, buttonText, to }) => {
    return(
        <div className="rcard">
            <img src={imageUrl} alt={title} className="rcard-image" />
            <h2 className="rcard-title">{title}</h2>
            <Link to={to} className="rcard-button">
                {buttonText}
            </Link>
        </div>
    )
}

export default RCardMod;
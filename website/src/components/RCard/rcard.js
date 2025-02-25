import { Link } from "react-router-dom";

const RCardMod = ({ imageUrl, title, buttonText, bottomText, bottomName, bottomJob, to }) => {
    return(
        <div className="rcard" style={!title ? { backgroundColor: "#D5D5D5e7" } : {}}>
            {title &&
                <>
                <img src={imageUrl} alt={title} draggable={false} className="rcard-image" />
                <h2 className="rcard-title">{title}</h2>
                </>
            }
            
            { buttonText &&
                <Link to={to} className="rcard-button">
                    {buttonText}
                </Link>
            }
            <p style={{color: "#194866", textAlign: "justify"}}>{bottomText}</p>
            {!title && 
                <>
                <div className="info-container">
                    <img src={imageUrl} alt={title} draggable={false} className="rcard-rounded-image" />
                    <div className="info-role">
                        <h3>{bottomName}</h3>
                        <h5>{bottomJob}</h5>
                    </div>
                </div>
                </>               
            }
            
        </div>
    )
}

export default RCardMod;
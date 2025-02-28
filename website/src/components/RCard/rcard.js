import { Link } from "react-router-dom";

const RCardMod = ({ imageUrl, title, buttonText, bottomText, bottomName, bottomJob, to }) => {
    return(
        <div 
            className={`rcard ${!title ? "variant" : ""}`}
            style={!title ? { backgroundColor: "#C8C8C8EA" } : {}}
        >
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
            {bottomText &&
                <p style={{color: "#232323", textAlign: "justify"}}>{bottomText}</p>
            }
            {!title && 
                <>
                <div className="info-container">
                    <img src={imageUrl} alt={title} draggable={false} className="rcard-rounded-image" />
                    <div className="info-role">
                        <h3>{bottomName}</h3>
                        <h5 style={{color: "#232323"}}>{bottomJob}</h5>
                    </div>
                </div>
                </>               
            }
            
        </div>
    )
}

export default RCardMod;
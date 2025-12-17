
import './Character.css';

const Character = ({ staticImg, animatedImg, altText }) => {
    return (
        <div className="character-container">
            <img src={staticImg} alt={altText} className="character-image static" />
            <img src={animatedImg} alt={altText} className="character-image animated" />
        </div>
    );
};

export default Character;

import PropTypes from "prop-types";
import './Button.css';


const Button = ({color, text, onClick}) => {
    return (
        <div className="btn">
            <button onClick={onClick} style={{backgroundColor: color}}>{text}</button>
        </div>
    )
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
}

export default Button
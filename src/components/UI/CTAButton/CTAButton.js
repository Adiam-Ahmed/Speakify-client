import './CTAButton.scss';

//className: custom class name
//text: button text
//types: primary, secondary, header, delete
//onClick: function to run when button is clicked

const CTAButton = ({ className, text, btnType, onClick ,type = 'button' }) => {
    const buttonClass = `cta-button__${btnType} ${className}`;
    return (
        <button className={buttonClass} onClick={onClick}>
            {text}
        
        </button>
    );
};

export default CTAButton;
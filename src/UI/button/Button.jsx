import React from 'react';
import classes from './Button.module.scss';

const Button = ({ text, onClick, solid=false }) => {
    return (
        <button className={solid ? classes.buttonSolid : classes.button} onClick={onClick}>
            {text}
        </button>
    );
}

export default Button;

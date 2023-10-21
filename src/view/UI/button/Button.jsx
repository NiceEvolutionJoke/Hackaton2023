import React from 'react';
import classes from './Button.module.scss';

const Button = ({ children, onClick}) => {
    return (
        <button className={classes.button} onClick={onClick}>
          {children}
        </button>
    );
}

export default Button;

import React from 'react';
import classes from './Input.module.scss';


const Input = ({ value, onChange, placeholder, solid=false }) => {
    return (
        <div className={solid ? classes.InputSolid : classes.popup__input}>
            <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} required />
        </div>
    );
}

export default Input;

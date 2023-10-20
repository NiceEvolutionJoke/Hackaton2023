import React from 'react';
import classes from './Title.module.scss'

const Title = ({ text }) => {
    return (
        <div className={classes.Title}>
            {text}
        </div>
    );
}

export default Title;

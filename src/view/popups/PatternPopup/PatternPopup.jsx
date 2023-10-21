import React from 'react'
import classes from './PatternPopup.module.scss';
import iconClose from '../../../assets/icons/iconClose.svg';

const PatternPopup = ( { children, setOpen, open }) => {
    console.log(open);
  return (
    <div className={classes.popup} onClick={()=>setOpen(false)}>
      <div className={classes.popupBlock} onClick={e=>e.stopPropagation()}>
        <div className={classes.popupClose} onClick={()=>setOpen(false)}>
            <img src={iconClose} alt="close" />
        </div>
            {children}
      </div>
    </div>
  )
}

export default PatternPopup

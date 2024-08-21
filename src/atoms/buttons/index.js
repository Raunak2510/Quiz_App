import React from "react";

import styles from "./button.module.scss";

function Button(props){
   const {text, className, handleClick, disabled, color}= props;
//console.log()
   return (
    <button className={`${styles.button} ${className}`} onClick={handleClick}
    disabled={disabled}
    style={{backgroundColor:color}}
    >
        
        {text}
    </button>
   )
}

export default Button;
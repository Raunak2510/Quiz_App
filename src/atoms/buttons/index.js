import React from "react";

import styles from "./button.module.scss";

function Button(props){
   const {text, className, handleClick}= props;

   return (
    <button className={`${styles.button} ${className}`} onClick={handleClick}>
        
        {text}
    </button>
   )
}

export default Button;
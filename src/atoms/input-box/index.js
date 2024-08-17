import React from "react";

import styles from "./input-box.module.scss";

function InputBox(props){

    const {type, placeholder, value, className}= props;

    return(
        <input
        className={`${styles.input} ${className}`}
        type={type}
        placeholder={placeholder}
        value={value}
        />
       
    )
}

export default InputBox;
import React from "react";

import styles from "./input-box.module.scss";

function InputBox(props){

    const {type, placeholder, value, className, label, onChange, name}= props;

    return(
        
        <label>
        <input
        className={`${styles.input} ${className}`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
       
        />
        {label}
        </label>
        
       

       
    )
}

export default InputBox;
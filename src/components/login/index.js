import React from "react";

import Button from "../../atoms/buttons/index.js";
import InputBox from "../../atoms/input-box/index.js";

import styles from "./login.module.scss";

function Login(){
   
    return(
    <section className={styles.section}>
        <h3>Hey, Learner <br />Fill your Login Credentials</h3>
        

       <InputBox type={"text"} 
       placeholder={"email"}
       />

        <InputBox type={"password"} 
       placeholder={"password"}
      
        />

        <Button text={"SignIn"} 
        className={styles.button}
        />
      <p>Don't have account? Get Started</p>
         </section>
    )
}

export default Login;
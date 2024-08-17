import React from "react";

import InputBox from "../../atoms/input-box";
import Button from "../../atoms/buttons";
import styles from "./signup.module.scss";

function SignUp(){
    return(
        <section className={styles.section}>
        <h3>Hi Learner <br/>Fill your details to signup</h3>

        <InputBox type={"text"}
        placeholder={"FirstName"}
        />

        <InputBox type={"text"}
        placeholder={"LastName"}
        />

        <InputBox type={"text"}
        placeholder={"Email-Id"}
        />

       <InputBox type={"text"}
        placeholder={"Password"}
        />

        <Button text={"SignUp"}
        className={styles.button}
        />

        <p>Already have an account? Click here</p>
        </section>
    )
}

export default SignUp;
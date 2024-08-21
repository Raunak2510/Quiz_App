import React, {useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

import InputBox from "../../atoms/input-box";
import Button from "../../atoms/buttons";
import QuestionDashboard from "../../pages/question-dashboard";
import TermAndCondition from "../../pages/conformation-page/index.js"

import styles from "./signup.module.scss";

function SignUp(){

    const [status, setStatus]=useState("");
    const [email, setEmail]=useState("");
    const [name, setName]=useState("");
    const [password, setPassword]= useState("");

    const signUpUrl="http://localhost:8000/api/users/register";
   
    function signUp() {
        axios.post(signUpUrl, {
          name: name,
          email: email,
          password: password,
        })
        .then((response)=>{
          setStatus("SignUp success");
          console.log(response.data);
         
        }
    
        )
        .catch((error)=>{
          setStatus("signUp failed try gain");
          console.log(error);
        })
      }
      if(status==="SignUp success"){
        return(
         <TermAndCondition />
        )
      } 

    return(
        <section className={styles.section}>
        <h3>Hi Learner <br/>Fill your details to signup</h3>

        <InputBox type={"text"}
        placeholder={"Name"}
        value={name}
        onChange={(e)=>setName(e.target.value)}
        />

        {/* <InputBox type={"text"}
        placeholder={"LastName"}
        /> */}

        <InputBox type={"text"}
        placeholder={"Email-Id"}
        value={email}
        onChange={(e)=> setEmail(e.target.value)}
        />

       <InputBox type={"text"}
        placeholder={"Password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />

        <Button text={"SignUp"}
        className={styles.button}
        handleClick={signUp}
        />

        <p>Already have an account? <Link to="/login">Click here</Link></p>
        </section>
    )
}

export default SignUp;
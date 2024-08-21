import React, {useState} from "react";
import axios from "axios"
import {Link} from "react-router-dom";

import Button from "../../atoms/buttons/index.js";
import InputBox from "../../atoms/input-box/index.js";
import TermAndCondition from "../../pages/conformation-page/index.js";
import QuestionDashboard from "../../pages/question-dashboard/index.js";

import styles from "./login.module.scss";

function Login(){

    const logInUrl="http://localhost:8000/api/users/login";


    const [email, setEmail]= useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus]= useState("");

    function login() {
        axios.post(logInUrl, {
          
          email: email,
          password: password,
        })
        .then((response)=>{
          setStatus("SignIn success");
          console.log(response.data);
          localStorage.setItem("userId", response.data.user);
          console.log("res.user");
          console.log(response.data.user);
         
        }
    
        )
        .catch((error)=>{
          setStatus("signUp failed try gain");
          console.log(error);
        })
      }
      if(status==="SignIn success"){
        return(
         <TermAndCondition />
        )
      } 
   

   
    return(
    <section className={styles.section}>
        <h3>Hey, Learner <br />Fill your Login Credentials</h3>
        

       <InputBox type={"text"} 
       placeholder={"email"}
       value={email}
       onChange={(e)=> setEmail(e.target.value)}
       />

        <InputBox type={"password"} 
       placeholder={"password"}
       value={password}
       onChange={(e)=>setPassword(e.target.value)}
        />

        <Button text={"SignIn"} 
        className={styles.button}
        handleClick={login}
        />
       <p> Don't have an account? <Link to="/register">SignUp</Link> </p>
         </section>
    )
}

export default Login;
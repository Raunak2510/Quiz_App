import React, { useState } from "react";

import InputBox from "../../atoms/input-box";
import Button from "../../atoms/buttons";
import CameraStream from "../../utills/camera-streaming";
import QuestionDashboard from "../question-dashboard";

import styles from "./conformation.module.scss";

function TermAndCondition(){

    const [submitClick, setSubmitClick]= useState("");
    const [accept, setAccept]= useState("");

    function handleSubmit(){
        setSubmitClick("Click");
        console.log("hey");
    }
    if(submitClick==="Click" ){
        return(
            <QuestionDashboard />
        )
    }
    
    return (
        <section className={styles.section}>
            <article className={styles.termcondition}>
           <h3>Term and Condition</h3>
           <ul>
            <li>
           <p>You cant change browser during test</p>
           </li>
          <li>
           <p>You cant pause camera </p>
           </li> 
           <li>
           <p>Dont cheat</p>
           </li>
           <li>
           <p>You cant change browser during test</p>
           </li>
          <li>
           <p>You cant pause camera </p>
           </li> 
           <li>
           <p>Dont cheat</p>
           </li>
           </ul>
           </article>
          
          <CameraStream />
          
           <p className={styles.agree}> <InputBox type={"checkbox"} className={styles.input}
           
           onChange={(e)=> setAccept("checked")}
           />
           I read the entire term and cond.</p>
           
           
           <Button text={"Submit"} className={styles.button}
           handleClick={handleSubmit}
           />

        </section>
    )
}

export default TermAndCondition;
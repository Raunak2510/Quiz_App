import React , {useState} from "react";
import axios from "axios";

import styles from "./result.module.scss";


function Result(){

  const [marks , setMarks] =useState(0);

   const totalMarksUrl="http://localhost:8000/api/submission/finalmarks";

   function totalMarks(){
        axios.get(totalMarksUrl, {})
        .then(response=>{
            setMarks(response.data);
        })
        .catch((error) => {
            console.log(error)
        })
        
   }
   totalMarks();

    return(
        <section className={styles.section}>
          <h1>Hi Your Total Marks is {marks}</h1>
        </section>
    )
}

export default Result;
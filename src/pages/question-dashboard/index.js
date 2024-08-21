import React, { useState, useEffect } from "react";
import axios from "axios";

import useQuestions from "../../data/questions.js"; 
import InputBox from "../../atoms/input-box";
import Button from "../../atoms/buttons";
import QuestionSubject from "../../components/question-subject";
import Timer from "../../components/timer";
import Result from "../../components/result/index.js";

import styles from "./question-dashboard.module.scss";

function QuestionDashboard() {

    const { questions, loading, error } = useQuestions();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [questionColors, setQuestionColors] = useState([]);
    const [selectedOption, setSelectedOption] = useState([]);
    const [questionId, setQuestionId] = useState([]);
    const [submit, setSubmit]=useState("no");
   
//    console.log("local");
//    console.log(localStorage.getItem("userId"));
//    console.log(localStorage);

     const userId=localStorage.getItem("userId");
     const testId="66c444fb2b4ebc06763a2598";

    const submitUrl="http://localhost:8000/api/submission/submittest";
  
    const submitTest = () => {
        const selections = questions.map((questionId, index) => ({
            
            questionId: questions[index]._id,
            options: selectedOption[index]

        }));

        axios.post(submitUrl, {
            userId: userId,
            testId: testId,
            selections: selections
        })
        .then((response) => {
            console.log("Test submitted successfully", response.data);
            setSubmit("yes");
        })
        .catch((error) => {
            console.error("Error submitting test", error);
            
        });
    };


   

    useEffect(() => {
        if (questions.length) {
            setQuestionColors(Array(questions.length).fill("white"));
            setSelectedOption(Array(questions.length).fill("null"));
        }
    }, [questions]);

    const handleOptionChange = (optionIndex) => {
         const updatedSelections = [...selectedOption];
        updatedSelections[currentQuestionIndex] = optionIndex; 
        setSelectedOption(updatedSelections);
        setQuestionId(questions[currentQuestionIndex].question_id);
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            const updatedColors = [...questionColors];
            updatedColors[currentQuestionIndex] = selectedOption[currentQuestionIndex] !== null ? "green" : "white"; 
            setQuestionColors(updatedColors);
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleMarkForReview = () => {
        const updatedColors = [...questionColors];
        updatedColors[currentQuestionIndex] = "red"; 
        setQuestionColors(updatedColors);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    if (loading) return <p>Loading questions...</p>;
    if (error) return <p>Error loading questions.</p>;
    if (!questions.length) return <p>No questions available.</p>;
    if(submit==="yes"){
        return (
            <Result />
        )
    }
    return (
        <section className={styles.questionDashboard}>
            <article className={styles.subject}>
                <h3>React Test</h3>
            </article>
            <article className={styles.timer}>
                <h5>React - Question {questions[currentQuestionIndex].question_id}</h5>
                <Timer />
            </article>

            <article className={styles.dashboard}>
                <article className={styles.question}>
                    <p>{questions[currentQuestionIndex].question}</p>
                    <div className={styles.options}>
                        {Object.keys(questions[currentQuestionIndex].options).map((key, index) => (
                            <InputBox
                                // key={index}
                                type="radio"
                                name={questions[currentQuestionIndex].question_id} 
                                value={questions[currentQuestionIndex].options[key]}
                                label={` ${index + 1} ${questions[currentQuestionIndex].options[key]}`}
                                checked={selectedOption[currentQuestionIndex] === index}
                                onChange={() => handleOptionChange(questions[currentQuestionIndex].options[key])}
                            />
                        ))}
                    </div>
                </article>

                <QuestionSubject
                    questions={questions}
                    colors={questionColors}
                    currentQuestionIndex={currentQuestionIndex}
                />
            </article>

            <div className={styles.navigationButtons}>
                <Button
                    text={"Mark for Review"}
                    className={styles.mark_for_review}
                    handleClick={handleMarkForReview}
                />
                <Button
                    text={"Previous"}
                    disabled={currentQuestionIndex === 0}
                    handleClick={handlePrevious}
                    className={styles.previous}
                />
                <Button
                    text={"Next"}
                    disabled={currentQuestionIndex === questions.length - 1}
                    handleClick={handleNext}
                    className={styles.next}
                />
                <Button
                    text={"Submit"}
                    className={styles.submit}
                    handleClick={submitTest}
                />
            </div>
        </section>
    );
}

export default QuestionDashboard;

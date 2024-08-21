import React from "react";
import Button from "../../atoms/buttons";
import styles from "./question-subject.module.scss";

function QuestionSubject({ questions, colors, currentQuestionIndex }) {
    return (
        <section className={styles.section}>
            <article className={styles.subject}>
                <h3>React</h3>
            </article>

            <article className={styles.question_number}>
                {questions && Array.isArray(questions) ? (
                    questions.map(({ question_id }, index) => (
                        <Button
                            text={question_id}
                            key={index}
                            className={styles.button}
                            color={colors[index]}
                        />
                    ))
                ) : (
                    <p>No questions available.</p>
                )}
            </article>
        </section>
    );
}

export default QuestionSubject;

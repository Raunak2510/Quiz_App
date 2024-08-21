import { useState, useEffect } from "react";
import axios from "axios";

const useQuestions = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const getQuestionUrl = "http://localhost:8000/api/question/getquestion";

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(getQuestionUrl);
                // console.log("res");
                // console.log(response);
                const formattedQuestions = response.data.map((item, index) => ({
                    _id:item._id,
                    question_id: index + 1,
                    question: item.question,
                    options: {
                        a: item.options[0],
                        b: item.options[1],
                        c: item.options[2],
                        d: item.options[3]
                    }
                }));
                setQuestions(formattedQuestions);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching questions:", error);
                setError(error);
                setLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    return { questions, loading, error,  };
};

export default useQuestions;

import React, { useEffect, useState } from "react";
import quizzes from "../database/quizzes.json"
import { Link } from "react-router-dom";

const Home = () => {
    const [quizList, setQuizList] = useState([]);

    useEffect(() =>{
        setQuizList(quizzes)
    }, [])

    return (
        <div className="container  mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Available Quizzes</h1>
            <ul>
                {quizList.map(quiz => (
                    <li key={quiz.id} className="mb-2">
                        <Link 
                            to={`/quiz/${quiz.id}`}
                            className="text-blue-500 hover:underline"
                        >
                            {quiz.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
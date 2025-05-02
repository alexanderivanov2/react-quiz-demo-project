import { useState } from 'react'
import QuestionTimer from "./QuestionTimer";

function Answers({ answers, correctAnswer, handleSelectAnswer, handleSkipAnswer }) {
    const [selectedAnswer, setSelectedAnswer] = useState({ index: null, result: null });

    let timer = 10000;

    if (selectedAnswer.index) {
        timer = 1000;
    }

    if (selectedAnswer.result) {
        timer = 2000;
    }

    const handleSelect = (answer, index) => {
        if (answer) {
            setSelectedAnswer(prevAnswer => ({ ...prevAnswer, index }));
            setTimeout(() => {
                setSelectedAnswer(prevAnswer => {
                    const isRight = answer === correctAnswer
                    return { ...prevAnswer, index, result: isRight ? 'correct' : 'wrong' }
                });
                setTimeout(() => {
                    setSelectedAnswer({ index: null, result: null })
                    handleSelectAnswer(answer)
                }, 2000)
            }, 1000)
        } else {
            handleSelectAnswer(answer)
        }
    }
    return (
        <>
            <QuestionTimer
                key={timer}
                timeout={timer}
                onTimeout={selectedAnswer.index ? null : handleSkipAnswer}
                mode={!!selectedAnswer.index}
            />
            {answers.map((answer, index) => (
                <li key={index} className="answer">
                    <button
                        className={`${selectedAnswer.index === index ? `selected ${selectedAnswer.result}` : null}`}
                        disabled={selectedAnswer.index}
                        onClick={() => selectedAnswer.index ? null : handleSelect(answer, index)}>
                        {answer}
                    </button>
                </li>))
            }
        </>
    )
}

export default Answers
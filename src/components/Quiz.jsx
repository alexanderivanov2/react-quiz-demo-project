import { useCallback, useState } from "react"
import QUESTIONS from '../questions'

import Answers from "./Answers";
import Summary from "./Summary";

function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(answer) {
    setUserAnswers(prevUserAnswers => [...prevUserAnswers, answer])
  }, [])

  const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer])

  if (quizIsComplete) {
    return <Summary userAnswers={userAnswers}/>
  }

  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers].sort(() => Math.random() - 0.5)

  return (
    <div id="quiz">
      <div id="question">
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          <Answers key={`answers-${activeQuestionIndex}`} answers={shuffledAnswers} handleSelectAnswer={handleSelectAnswer} handleSkipAnswer={handleSkipAnswer} correctAnswer={QUESTIONS[userAnswers.length].answers[0]}/>
        </ul>
      </div>
    </div> 
  )
}

export default Quiz
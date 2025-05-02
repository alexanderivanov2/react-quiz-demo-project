import quizCompleteImg from '../assets/quiz-complete.png'
import QUESTIONS from '../questions'

function Summary({ userAnswers }) {
    const answersStatistic = userAnswers.reduce((acc, currentValue, index) => {
        if (currentValue === null) {
            acc.skipped += 1;
        } else {
            if (currentValue === QUESTIONS[index].answers[0]) {
                acc.correct += 1;
            }

            acc.answers += 1;
        }
        return acc
    }, { skipped: 0, correct: 0, answers: 0 })

    const calculateProcent = (max, value) => Math.round((value / max) * 100)
    const questionsLenght = userAnswers.length
    const skippedPercent = calculateProcent(questionsLenght, answersStatistic.skipped)
    const correctPercent = calculateProcent(questionsLenght, answersStatistic.correct)
    const answersPercent = 100 - (skippedPercent + correctPercent)

    return (
        <div id="summary">
            <img src={quizCompleteImg} alt="Trophy Icon" />
            <h2>Quiz Completed</h2>
            <div id="summary-stats">
                <p>
                    <span className="number">{skippedPercent}%</span>
                    <span className="text">skipped</span>
                </p>
                <p>
                    <span className="number">{correctPercent}%</span>
                    <span className="text">answered correctly</span>
                </p>
                <p>
                    <span className="number">{answersPercent}%</span>
                    <span className="text">answer</span>
                </p>
            </div>
            <ol>
                {userAnswers.map((answer, index) => {
                    let cssClass = 'user-answer';

                    if (answer === null) {
                        cssClass += ' skipped';
                    } else if (answer === QUESTIONS[index].answers[0]) {
                        cssClass += ' correct'
                    } else {
                        cssClass += ' wrong'
                    }
                    return (
                        <li key={index}>
                            <h3>{index + 1}.</h3>
                            <p className="question">{QUESTIONS[index].text}</p>
                            <p className={cssClass}>{answer ?? 'Skipped'}</p>
                        </li>
                    )
                }
                )}
            </ol>
        </div>
    )
}

export default Summary
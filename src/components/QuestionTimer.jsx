import { useEffect, useState } from 'react'

function QuestionTimer({ timeout, onTimeout, mode }) {
    const [remainingTime, setRemainingTime] = useState(timeout);
    useEffect(() => {
        const timeoutId = setTimeout(onTimeout, timeout);
        return () => {
            clearTimeout(timeoutId) 
        }
    }, [timeout, onTimeout])
    
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (remainingTime > 0) {
                setRemainingTime(prevRemainingTime => prevRemainingTime - 100);
            } 
        }, 100)
        
        return () => clearInterval(intervalId)
    }, [])

    return (
        <progress 
            id="question-time"
            className={`${mode ? 'answered' : ''}`}
            max={timeout}
            value={remainingTime} 
        
        />
    )
}

export default QuestionTimer
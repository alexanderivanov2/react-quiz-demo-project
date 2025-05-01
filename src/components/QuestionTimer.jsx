import { useEffect, useState } from 'react'

function QuestionTimer({ timeout, onTimeout }) {
    const [remainingTime, setRemainingTime] = useState(timeout);
    useEffect(() => {
        console.log('SET TIMEOUT')
        const timeoutId = setTimeout(onTimeout, timeout);
        return () => {
            clearTimeout(timeoutId) 
            // setRemainingTime(timeout)
        }
    }, [timeout, onTimeout])
    
    useEffect(() => {
        console.log('SET INTERVAL')
        const intervalId = setInterval(() => {
            console.log('see')
            if (remainingTime > 0) {
                setRemainingTime(prevRemainingTime => prevRemainingTime - 100);
            } 
        }, 100)
        
        return () => clearInterval(intervalId)
    }, [])

    return (
        <progress id="question-time" max={timeout} value={remainingTime}/>
    )
}

export default QuestionTimer
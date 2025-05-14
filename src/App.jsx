import {useState, useEffect} from 'react'
import { chooseRandomQuestion, resetUsedQuestions } from './utils'


function App() {
  const [currentQuestion, setCurrentQuestion]= useState(chooseRandomQuestion)
  const [questionCount, setQuestionCount]= useState(1)
  const [optionsChosen, setOptionsChosen]= useState([])
  const [timer, setTimer]= useState(120)
  const [isPaused, setIsPaused] = useState(false);
  const [score, setScore] = useState(0) 
  const [isQuizOver, setIsQuizOver]= useState(false)


  useEffect(()=> {
    if(timer === 0){
      setIsQuizOver(true)
    }
    else if(!isPaused && timer > 0){
      setTimeout(()=>{
        setTimer(prevTime => prevTime-1) 
      }, 1000)
    }
  }, [timer, isPaused])


  function getNextQuestion(){
    if(questionCount === 30){
      setIsQuizOver(true)
      setIsPaused(true)
    }
    else{
      setCurrentQuestion(chooseRandomQuestion())
      setQuestionCount(prevCount => prevCount+1)
      setOptionsChosen([])
    }
  }

  function handleOptionClick(option){
    setOptionsChosen(prevOptions => [...prevOptions, option])
    if(option === currentQuestion.answer && optionsChosen.length === 0){
      setScore(prevScore => prevScore+1)
    }
  }

  function handlePause(){
    setIsPaused(prevValue => !prevValue)
  }

  function startQuiz(){
    resetUsedQuestions();

    setCurrentQuestion(chooseRandomQuestion())
    setQuestionCount(1)
    setOptionsChosen([])
    setTimer(120)
    setIsPaused(false)
    setScore(0)
    setIsQuizOver(false)
  }


  return (
    <>  
      <header>
        <h1>React Quiz</h1>

        {!isQuizOver ? 
        (<div className='question-container'>
          <p>Question {questionCount}</p>  
          <h2> {currentQuestion.question}</h2>
        </div>) :
        <div className="time-up-status">Time's Up! ⏰</div>
        } 

        <section className="timer-container">
          <p>
            {Math.floor(timer/60)}: {`${timer%60 < 10 ? `0${timer%60}`: `${timer%60}`}`}
          </p>
          <button onClick={handlePause}>{isPaused? <i className="fa-solid fa-play"></i>: <i className="fa-solid fa-pause"></i>}</button>  
          <span style={{visibility: isPaused? "visible": "hidden"}}>Paused</span>
        </section>
      </header>

      <main>  
        {
          !isQuizOver ?
          <div className="options-container"> 
            {
              currentQuestion.options.map((option, index) => {
              const isOptionChosen=  optionsChosen.includes(option)
              const isCorrectOptionChosen = isOptionChosen && currentQuestion.answer === option

              let optionAlphabet;
              if(index === 0){
                optionAlphabet= "A"
              }
              else if(index === 1){
                optionAlphabet= "B"
              }
              else if(index === 2){
                optionAlphabet= "C"
              }
              else if(index === 3){
                optionAlphabet= "D"
              }

              return (
                <button 
                  key= {option}
                  onClick={()=> handleOptionClick(option)}
                  style={{
                    backgroundColor: isCorrectOptionChosen ? "#4ED7F1" : (isOptionChosen ? "#FFC1DA" :"" ),
                    color: isOptionChosen ? "white" :"" ,
                    cursor: isPaused? "not-allowed": "pointer"
                  }}
                  disabled = {isPaused}
                >
                  <span 
                    className='option-alphabet'
                    style={{
                      backgroundColor: isCorrectOptionChosen ? "#074173" : (isOptionChosen ? "#FF90BB" :"" ),
                      color: isOptionChosen ? "white" :"" 
                    }}
                  >
                    {optionAlphabet}
                  </span> 
                  {option}
                </button>
              )  
              })
            }
          </div>  
          :
          <div className="score-container">
            <h3>Your Score is : {((score/questionCount)*100).toFixed(2)}%</h3> 
            <p>Questions Answered Correctly: {score} / {questionCount}</p>
          </div>
          
        }
    
        {
          !isQuizOver ? 
          <button 
            className="next-btn" 
            onClick={getNextQuestion}  
            disabled = {isPaused}
            style={{cursor: isPaused? "not-allowed": "pointer"}}
          >
            Next
          </button> :
          <button className="start-btn" onClick={startQuiz}>Try again</button>
        }
      </main> 
    </>
    
  )
}

export default App

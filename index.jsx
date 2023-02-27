import React from 'react';
import ReactDOM from 'react-dom/client';
import StartMenu from "./StartMenu.jsx"
import QuizMenu from './QuizMenu.jsx'

function App() {
  const [started, setStarted] = React.useState(false)
  const [questions, setQuestions] = React.useState([])
  const [wrongAnswers, setWrongAnswers] = React.useState([])
  const [rightAnswers, setRightAnswers] = React.useState([])
  
  console.log(wrongAnswers)
function startGame(){
  setStarted(true)

  fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
    .then(res => res.json())
    .then(data => {
      let questionsArray = (data.results)
      setRightAnswers(prevRightAnswers => {
        return(
          [...prevRightAnswers, ...questionsArray.map(rightAnswer => 
          decodeHTML(rightAnswer.correct_answer))]
        )
      })
      setWrongAnswers(prevWrongAnswers =>{
        return(
          [...prevWrongAnswers, ...questionsArray.map(wrongAnswer => 
          decodeHTML(wrongAnswer.incorrect_answers).split(","))]
        )
      })
      
      setQuestions(prevQuestions => (
        [...prevQuestions, ...questionsArray.map(questionObj => decodeHTML(questionObj.question))]
      ))
    })
}
function decodeHTML(html) {
  const parser = new DOMParser();
  const decodedString = parser.parseFromString(`<!doctype html><body>${html}`, 'text/html').body.textContent;
  return decodedString;
}

function restartGame(){
  setStarted(false)
  setWrongAnswers([])
  setRightAnswers([])
  setQuestions([])
  console.log("restarted")
}

  return (
    <main>
      {started ? 
      
      <QuizMenu 
      rightAnswers={rightAnswers} 
      questions={questions}
      wrongAnswers={wrongAnswers}
      restartGame = {restartGame}
      /> :
      
      <StartMenu 
      clicker={startGame} 
      />}
      
    </main>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />); 
import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import StartMenu from "./StartMenu.jsx"
import QuizMenu from './QuizMenu.jsx'

function App() {
  const [started, setStarted] = useState(false)
  const [questions, setQuestions] = useState([])
  const [wrongAnswers, setWrongAnswers] = useState([])
  const [rightAnswers, setRightAnswers] = useState([])
  const [difficulty, setDifficulty] = useState('easy');
  const [category, setCategory] = useState(9);
  const [numQuestions, setNumQuestions] = useState(1);

  function handleDifficultyChange(e) {
    setDifficulty(e.target.value);
  }

  function handleCategoryChange(e) {
    setCategory(e.target.value);
  }

  function handleNumQuestionsChange(e) {
    setNumQuestions(parseInt(e.target.value));
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onStartQuiz(difficulty, category, numQuestions);
  }

function startGame(){

  setStarted(true)

  fetch(`https://opentdb.com/api.php?amount=${numQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`)
    .then(res => res.json())
    .then(data => {
      decodeHTML(data.results)
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
         wrongAnswer.incorrect_answers)]
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
      difficulty={difficulty}
      category={category}
      numQuestions={numQuestions}
      handleCategoryChange={handleCategoryChange}
      handleDifficultyChange={handleDifficultyChange}
      handleNumQuestionsChange={handleNumQuestionsChange}
      handleSubmit={handleSubmit}
      clicker={startGame} 
      />}
      
    </main>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />); 
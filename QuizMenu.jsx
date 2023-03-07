import React from 'react';

export default function QuizMenu(props) {

  const [userAnswers, setUserAnswers] = React.useState([]);
  const [answersChecked, setAnswersChecked] = React.useState(false);
  const [correctAnswers, setCorrectAnswers] = React.useState(0)

function decodeHTMLEntities(text) {
  const tempElement = document.createElement("div");
  tempElement.innerHTML = text;
  return tempElement.textContent;
}


  const combinedAnswers = React.useMemo(() => {
    const combined = [];
    for (let i = 0; i < props.questions.length; i++) {
      const rightAnswer = props.rightAnswers[i];
      const wrongAnswers = props.wrongAnswers[i];
      const allAnswers = [...wrongAnswers, rightAnswer];
      shuffleArray(allAnswers);
      combined.push(allAnswers.map(answer => decodeHTMLEntities(answer)));
    }
    return combined;
  }, [props.questions, props.rightAnswers, props.wrongAnswers]);

  let questionEls = props.questions.map((questionStr, index) => {
    const answers = combinedAnswers[index];
    const rightAnswer = props.rightAnswers[index];
    return (
      <div className="q-wpr" key={index}>
        <h1 className="questions">{questionStr}</h1>
        <div className="answer-wpr">
          {answers.map((answer, answerIndex) => (
            <button
  key={answerIndex}
  className={`answers ${userAnswers[index] === answer ? "selected" : ""} 
              ${answersChecked && props.rightAnswers[index] === answer ? "correct" : ""} 
              ${answersChecked && userAnswers[index] !== answer && props.rightAnswers[index] !== answer ? "lessOpaque" : ""}
              ${answersChecked && userAnswers[index] !== answer && props.rightAnswers[index] === answer ? "correctAnswer" : ""}
              ${answersChecked && userAnswers[index] === answer && props.rightAnswers[index] !== answer ? "incorrect" : ""}`}
  onClick={() => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = answer;
    setUserAnswers(newAnswers);
  }}
>
  {decodeHTMLEntities(answer)}
</button>
          ))}
        </div>
      </div>
    );
  });

  function handleSubmit() {
    setAnswersChecked(true);
    const isCorrect = userAnswers.map((answer, index) => {
      return answer === props.rightAnswers[index];
    });
    const numCorrect = isCorrect.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    setCorrectAnswers(numCorrect)
    console.log(`You got ${numCorrect} out of ${props.questions.length} correct!`);
  }

  return (
    <div className="quiz-wpr">
      {questionEls}
      <div className="results-wpr">
        {answersChecked ? <p className="results">You got {correctAnswers}/{props.questions.length}</p> : "" }
        {answersChecked ? <button className="check-answers-btn" onClick={props.restartGame}>
        Play Again
      </button> : <button className="check-answers-btn" onClick={handleSubmit}>
        Check Answers
      </button>}
      </div>
    </div>
  );
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
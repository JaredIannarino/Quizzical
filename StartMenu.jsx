import React, { useState } from 'react';

export default function StartMenu(props) {

  return (
    <div className="start-menu">
      <h1>Quizzical</h1>
      <p>The ultimate free trivia game.</p>
      <form className="form-wpr" onSubmit={props.handleSubmit}>
      <div className="wpr">
        <label className="label" htmlFor="difficulty">Difficulty:</label>
        <select className="selector" id="difficulty" name="difficulty" value={props.difficulty} onChange={props.handleDifficultyChange}>
       
    <option value="easy">Easy</option>
    <option value="medium">Medium</option>
    <option value="hard">Hard</option>
  </select>
  </div>
  <div className="wpr">
  <label className="label" htmlFor="num-questions">Questions:</label>
  <select className="selector" id="num-questions" name="num-questions" value={props.numQuestions} onChange={props.handleNumQuestionsChange}>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    <option value="6">6</option>
    <option value="7">7</option>
    <option value="8">8</option>
    <option value="9">9</option>
    <option value="10">10</option>
    <option value="11">11</option>
    <option value="12">12</option>
    <option value="13">13</option>
    <option value="14">14</option>
    <option value="15">15</option>
    <option value="16">16</option>
    <option value="17">17</option>
    <option value="18">18</option>
    <option value="19">19</option>
    <option value="20">20</option>
    <option value="21">21</option>
    <option value="22">22</option>
    <option value="23">23</option>
    <option value="24">24</option>
    <option value="25">25</option>
  </select>
  </div>
  <div className="wpr">
  <label className="label" htmlFor="category">Category:</label>
  <select className="selector" id="category" name="category" value={props.category} onChange={props.handleCategoryChange}>
    <option value="9">General Knowledge</option>
    <option value="10">Entertainment: Books</option>
    <option value="11">Entertainment: Film</option>
    <option value="12">Entertainment: Musicals & Theatres</option>
    <option value="14">Entertainment: Television</option>
    <option value="15">Entertainment: Video Games</option>
    <option value="16">Entertainment: Board Games</option>
    <option value="17">Science & Nature</option>
    <option value="18">Science: Computers</option>
    <option value="19">Science: Mathematics</option>
    <option value="20">Mythology</option>
    <option value="21">Sports</option>
    <option value="22">Geography</option>
    <option value="23">History</option>
    <option value="24">Politics</option>
    <option value="25">Art</option>
    <option value="26">Celebrities</option>
    <option value="27">Animals</option>
  </select>
  </div>
  <button className="button" onClick={props.clicker} >Start quiz</button>
</form>
    </div>
    )
}
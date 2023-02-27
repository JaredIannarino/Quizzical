import React from 'react';

export default function StartMenu(props){
    
    return(
    <div className="start-menu">
        <h1>Quizzical</h1>
        <p>Test your knowledge with the mini trivia game</p>
        <button onClick={props.clicker} >Start quiz</button>
    </div>
    )
}
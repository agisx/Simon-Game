import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

// import card and game session
import GameSession, { initialGame, startGame, nextLevel, endGame} from './SimonGame';
import {handlePlayKeyReleased} from './SimonGame';
import CreateCard from './Card';

initialGame(GameSession);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>       
    <h1 className="info" id="info" >{GameSession.info}</h1>
    <CreateCard 
      id="1"
      position="top-item"
      name="Red"
      color="red"
      clickCard={eventHandleCardClick}
    />
    <CreateCard 
      id="2"
      position="top-item"
      name="Green"
      color="green"
      clickCard={eventHandleCardClick}
    />
    <CreateCard 
      id="3"
      position="buttom-item"
      name="Yellow"
      color="yellow"
      clickCard={eventHandleCardClick}
    />
    <CreateCard 
      id="4"
      position="buttom-item"
      name="Blue"
      color="blue"
      clickCard={eventHandleCardClick}
    />
  </React.StrictMode>
);

function eventHandleCardClick(event) {
  if (!GameSession.isPlaying || GameSession.isHintPlaying) {    
    return event.preventDefault();
  }
  const color = GameSession.colorsList[GameSession.colorIndex];
  const card = event.target;
  
  // if the card is the same color as the current color, do 
  if (color === card.id) {
    // if not the last card, go to the next card
    if (GameSession.colorIndex === GameSession.colorsList.length - 1) {
      nextLevel(GameSession);
    } else {
      GameSession.colorIndex++;
    }
  } else {
    // false if the card is not the same color as the current color
    endGame(GameSession);
    
    setTimeout(() => {
      initialGame(GameSession)
    }, 3000);
  }

  event.preventDefault();
}
document.onkeyup = function(e) {
  if (!GameSession.isReadyToPlay) { return e.preventDefault(); }

  handlePlayKeyReleased(e, GameSession);

  return e.preventDefault();
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

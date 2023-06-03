const GameSession = {
    colorsList: [],
    colorIndex: 0,
    sessionColorPickIndex: 0,
    info: "",
    score: 0,
    bestScore: 0,
    isReadyToPlay: false,
    isPlaying: false,
    isHintPlaying: false,
};

function insertColor(gameSession) {
    // random number from 0 to 4
    let number = Math.floor(Math.random() * 4 + 1);
    let color = "red";
    if (number === 2) {
        color = "green";
    } else if (number === 3) {
        color = "yellow";
    } else if (number === 4) {
        color = "blue";
    }
    color = "red";
    gameSession.colorsList.push(color);
    gameSession.colorIndex= 0;
}

function initialGame(gameSession) {
    gameSession.colorsList = [];
    gameSession.colorIndex= 0;
    gameSession.score = 0;
    gameSession.bestScore = 0;
    gameSession.isPlaying = false;
    gameSession.info = "Simon Game";
    
    setTimeout(() => {
        gameSession.bestScore = localStorage.getItem("bestScore");
        gameSession.isReadyToPlay = true;
        setInformation(gameSession, "Press A Key to start");
    }, 3000);
}
function hintGame(gameSession) {
    // foreach color list with delay 200ms

    gameSession.isHintPlaying = true;

    hintGameColors(gameSession, 0);
}
function hintGameColors(gameSession, index) {
    if (index === gameSession.colorsList.length || !GameSession.isHintPlaying) {
        GameSession.isHintPlaying = false;
        return;
    }

    let color = String(gameSession.colorsList[index]);
    document.getElementById(color).classList.add("card-active"); 
    
    setTimeout(() => {
        document.getElementById(color).classList.remove("card-active");
        setTimeout(() => {
            hintGameColors(gameSession, index + 1);
        }, 1000)
    }, 2000);
}
function startGame(gameSession) {
    gameSession.isPlaying = true
    gameSession.isReadyToPlay = false;
    nextLevel(gameSession);

    setInformation(gameSession, "Follow the instructions to win or press A to end the game");
}
function nextLevel(gameSession) {
    gameSession.score += 1;
    insertColor(gameSession);
    hintGame(gameSession);
}
function endGame(gameSession) {
    gameSession.colorsList = [];
    gameSession.colorIndex= 0;
    gameSession.bestScore = gameSession.score > gameSession.bestScore? gameSession.score : gameSession.bestScore;
    gameSession.isPlaying = false;

    // lose game information
    if (gameSession.score > gameSession.bestScore) {
        localStorage.setItem("bestScore");
        // beat the best score
        gameSession.info = "Congratulations! You beat the best score!";
    } else {
        gameSession.info = "You lose!";
    }
    setInformation(gameSession, gameSession.info);

    gameSession.score = 0;

}

function setInformation(gameSession, information) {
    gameSession.info = information;
    document.getElementById('info').innerHTML = information;
}

// handle events A key released
function handlePlayKeyReleased(event, gameSession) {
    // check A key is released
    if (!(event.code === "KeyA")) { return event.preventDefault(); }
    if (!gameSession.isPlaying && event.code === "KeyA") {
        startGame(gameSession);
    } else if (gameSession.isPlaying && event.code === "KeyA") {
        endGame(gameSession);
    }
    return event.preventDefault();
}

export default GameSession;
export { initialGame, startGame, nextLevel, endGame };
export { handlePlayKeyReleased };
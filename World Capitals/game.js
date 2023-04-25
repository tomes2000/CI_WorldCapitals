let data = {};
let questionNumber = 0;

// API
const easyDifficulty = "https://opentdb.com/api.php?amount=10&category=22&difficulty=easy&type=multiple"
const mediumDifficulty = "https://opentdb.com/api.php?amount=10&category=22&difficulty=medium&type=multiple"
const hardDifficulty = "https://opentdb.com/api.php?amount=10&category=22&difficulty=hard&type=multiple"

// Difficulty selection
const easy = document.getElementById("easy");
const medium = document.getElementById("medium");
const hard = document.getElementById("hard");
let apiAddress;

// Game Page
// Scores & Question Number
let questionCounter = 1;
let questionNumber = document.getElementById("answer-number");
let score = 0;
let acceptingAnswer = true;
let scoreCounter = document.getElementById("score")

// Quiz
const question = document.getElementById("question");
const answerButtons = document.getElementById("answer-text");
const answer1 = document.getElementById("answer1");
const answer2 = document.getElementById("answer2");
const answer3 = document.getElementById("answer3");
const answer4 = document.getElementById("answer4");
let correctAnswer;
const next = document.getElementById("next");
let answerSelected;

// End Game Area
const finalScore = document.getElementById("final-score");
const userName = document.getElementById("userName");
const submitScoreBtn = document.getElementById("submitscorebtn");
const maxHighScores = 10;

// Remove difficulty function

function removeDifficulty() {
    document.getElementById("difficulty").classList.add("hide");
    document.getElementById("quiz-area").classList.remove("hide");
}

// Shuffle answers
// Source - https://www.youtube.com/watch?v=tLxBwSL3lPQ&ab_channel=AdamKhoury

function arrayShuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let s = Math.floor(Math.random() * (i + 1));
      [array[i], array[s]] = [array[s], array[i]];
    }
  }

  //Recall API Function
async function callApi() {
    const response = await fetch(apiAddress);
    if (response.status >= 200 && response.status <= 299) {
      data = await response.json();
      // Removes the difficulty box and starts the game
      removeDifficulty();
      getQuestion(data);
    } else
      // Error re-directed to 500.html page
      window.location.assign("500.html");
  }

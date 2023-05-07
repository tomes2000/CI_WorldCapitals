// Initial data and questionNumber values
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

  // Increase Score 
function increaseScore() {
    score += 10;
    scoreCounter.innerText = `${score}`;
  }
  
// Next question function
function nextQuestion(eventVariable) {
  questionCounter++;
  questionCounter.innerText = '${questionCounter}';
  document.getElementById(answerSelected).classList.remove("correctbtn","incorrectbtn");
  let displayCorrectAnswer = document.querySelector("correctbtn");

  for (let button of answerButtons) {
    if (button.innerHTML === correctAnswer) {
      button.removeAttribute("data-correct", "true");
    }
  }
  getQuestion(data);
}

  // Check the next question function
function checkAnswer(eventVariable) {

  // If answer is clicked on, then the answer button is disabled to prevent re-selection of answers
  $('.answer-text').prop('disabled', true);
  // Implement new ID variable when button is clicked
  answerSelected = eventVariable.target.getAttribute("id");

  // Verification if answer is correct in the dataset
  if (eventVariable.target.dataset.correct) {
    document.getElementById("outer-container").classList.add("correct");
    document.getElementById(answerSelected).classList.add("correctbtn");
    increaseScore();
   // Verification if answer is incorrect in the dataset
  } else {
    document.getElementById(answerSelected).classList.add("incorrectbtn");
    document.getElementById("outer-container").classList.add("incorrect");
    let displayCorrectAnswer = document.querySelector("[data-correct='true']");
    displayCorrectAnswer.classList.add("correctbtn");
  }

  // Display of next button from "hide" class
  next.classList.remove("hide");
  next.addEventListener("click", nextQuestion);
}

/// Get question function
function getQuestion(data) {
  next.classList.add("hide");
  document.getElementById("outer-container").classList.remove("correct", "incorrect");

// Interact with answer button
  $('.answer-text').prop('disabled', false);
  let results = data.results[questionNumber];
  if (questionNumber <= 14) {
  question.innerHTML = results.quesiton;
  correctAnswer = results.correctAnswer;

  const answers = [...results.incorrectAnswers, correctAnswer];
  arrayShuffle(answers);
  answer1.innerHTML = `${answers[0]}`;
  answer2.innerHTML = `${answers[1]}`;
  answer3.innerHTML = `${answers[2]}`;
  answer4.innerHTML = `${answers[3]}`;

// Check for correct answer and add attribute 

  for (let button of answerButtons) {
  if (button.innerHTML === decodeHtmlEntity(correctAnswer)) {
    button.setAttribute("data-correct", "true");
  }

// Adds event listener to each button
  button.setAttribute("click", checkAnswer);
}
  questionNumber++;
} 

// Final screen with score board
  else {
  document.getElementById("quiz-area").classList.add("hide");
  document.getElementById("end-area").classList.remove("hide");

  finalScore.innerText = `${score}`;
  }
}

/// High score function
// https://www.youtube.com/watch?v=DFhmNLKwwGw&list=PLDlWc9AfQBfZIkdVaOQXi1tizJeNJipEx&index=11&ab_channel=JamesQQuick
function saveHighScore(eventVariable) {
  eventVariable.preventDefault();

  const scoreLog = { 
  name: teamName.value, 
  score: score
};

// Manipulate array in the highScores
  highScores.push(scoreLog);
  highScores.sort((a,b) => b.score - a.score);
  highScores.splice(maxHighScores);
  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.assign("highscore.html");
}


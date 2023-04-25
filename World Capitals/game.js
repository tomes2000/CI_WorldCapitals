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



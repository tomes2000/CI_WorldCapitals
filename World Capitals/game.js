let data = {};
let questionNumber = 0;

// API
const easyDifficulty = "https://opentdb.com/api.php?amount=10&category=22&difficulty=easy&type=multiple"
const mediumDifficulty = "https://opentdb.com/api.php?amount=10&category=22&difficulty=medium&type=multiple"
const hardDifficulty = "https://opentdb.com/api.php?amount=10&category=22&difficulty=hard&type=multiple"

// DIFFICULTY BUTTONS
const easy = document.getElementById("easy");
const medium = document.getElementById("medium");
const hard = document.getElementById("hard");
let apiAddress;


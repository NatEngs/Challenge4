//Questions bank.
var questions = [
  {
    questionText: "Inside which element do you put JavaScript?",
    options: ["1. <var>", "2. <script>", "3. <section>", "4. <code>"],
    answer: "2. <script>",
  },
  {
    questionText: "How do you write 'Hello World' in an alert box?",
    options: ["1. alertbox('Hello World')", "2. alert('Hello World')", "3. msg('Hello World')", "4. modal('Hello World')",],
    answer: "2. alert('Hello World')",
  },
  {
    questionText: "How do you create a new function in JavaScript?",
    options: ["1. new.function() {}", "2. function myFunction() {}", "3. function:myFunction() {}", "4. function - myFunction() {}"],
    answer: "2. function myFunction() {}",
  },
  {
    questionText: "How do you find the minimum of x and y using JavaScript?",
    options: ["1. min(x,y)", "2. Math.min(x,y)", "3. Math.min(xy)", "4. min(xy)",
    ],
    answer: "2. Math.min(x,y)",
  },
  {
    questionText: "Which are the correcet 'if' statement to execute certain code if 'x' is equal to 2?",
    options: ["1. if(x 2)", "2. if(x = 2)", "3. if(x==2)", "4. if(x !=2)"],
    answer: "3. if(x==2)",
  },
];

//Communicate to HTML page
let startCard = document.querySelector("#startCard");
let questionCard = document.querySelector("#questionCard");
let scoreCard = document.querySelector("#scoreCard");
let scoreboardCard = document.querySelector("#scoreboardCard");

//Hide cards until called upon as the quiz progresses
function hideCards() {
  startCard.setAttribute("hidden", true);
  questionCard.setAttribute("hidden", true);
  scoreCard.setAttribute("hidden", true);
  scoreboardCard.setAttribute("hidden", true);
}

let resultDiv = document.querySelector("#resultDiv");
let resultText = document.querySelector("#resultText");

//Hide result until called
function hideResultText() {
  resultDiv.style.display = "none";
}

//Vars for the variable elements - timer, questions, and time counting down.
var intervalID;
var time;
var currentQuestion;

document.querySelector("#start-button").addEventListener("click", startQuiz);

// ********************GIVEN I am taking a code quiz********************
// ********************WHEN I click the start button********************
// ********************THEN a timer starts and I am presented with a question********************

//Function to start quiz and remove hidden status of question card and start question queue
function startQuiz() {
  hideCards();
  questionCard.removeAttribute("hidden");
  currentQuestion = 0;
  displayQuestion();

//Timer starting point for the quiz, interval for countdown and function for displaying time
  time = 60;
  intervalID = setInterval(countdown, 1000);
  displayTime();
}

//Function for reducing time by 1 second per the interval determined
function countdown() {
  time--;
  displayTime();
  if (time < 1) {
    endQuiz();
  }
}

//Function for displaying time on the page as it counts down
let timeDisplay = document.querySelector("#time");
function displayTime() {
  timeDisplay.textContent = time;
}

//Question is presented with the available answers
function displayQuestion() {
  let question = questions[currentQuestion];
  let options = question.options;

  let QuestionElement = document.querySelector("#questionText");
  QuestionElement.textContent = question.questionText;

  for (let i = 0; i < options.length; i++) {
    let option = options[i];
    let optionButton = document.querySelector("#option" + i);
    optionButton.textContent = option;
  }
}

// ********************WHEN I answer a question********************
document.querySelector("#quizOptions").addEventListener("click", checkAnswer);

//Check selected answer is correct
function optionIsCorrect(optionButton) {
  return optionButton.textContent === questions[currentQuestion].answer;
}

let answerGif = document.getElementById("nickCage");

//Function for correct/incorrect answer and wrong answer with Nick Cage surprise.  Adding 5 seconds for right answer and reducing 10 if wrong.
function checkAnswer(eventObject) {
  let optionButton = eventObject.target;
  resultDiv.style.display = "block";
  if (optionIsCorrect(optionButton)) {
    if (time >= 1) {
      time = time + 5
    };
    resultText.textContent = "Excited Nick Cage!";
    answerGif.src = "./assets/images/correct.gif";
    setTimeout(hideResultText, 1250);
  } else {
// ********************WHEN I answer a question incorrectly********************
// ********************THEN time is subtracted from the clock********************
    resultText.textContent = "Disappointed Nick Cage...";
    answerGif.src = "./assets/images/incorrect.gif";
    setTimeout(hideResultText, 1250);
    if (time >= 10) {
      time = time - 10;
      displayTime();
    } else {
      time = 0;
      displayTime();
      endQuiz();
    }
  }

// ********************THEN I am presented with another question********************
//Next question in the array
  currentQuestion++;

// ********************WHEN all questions are answered or the timer reaches 0********************
// ********************THEN the game is over********************
//Progress through the questions until the last one, and then end the quiz
  if (currentQuestion < questions.length) {
    displayQuestion();
  } else {
    endQuiz();
  }
}

// ********************WHEN the game is over********************
// ********************THEN I can save my initials and my score********************
let score = document.querySelector("#score");

//End of the quiz, clear the time, display the score with the score being the time left on the clock
function endQuiz() {
  clearInterval(intervalID);
  hideCards();
  scoreCard.removeAttribute("hidden");
  score.textContent = time;
}

let submitButton = document.querySelector("#submitButton");
let inputElement = document.querySelector("#name");

//Stores name and score when submit button is clicked
submitButton.addEventListener("click", storeScore);

// Store name with score at end of quiz
function storeScore(event) {
  event.preventDefault();
  if (!inputElement.value) {
    alert("You forgot to enter your name!");
    return;
  }
  let scoreboardItem = {
    name: inputElement.value,
    score: time,
  };
  updateStoredScoreboard(scoreboardItem);
  hideCards();
  scoreboardCard.removeAttribute("hidden");
  renderScoreboard();
}

//Update scoreboard in local storage
function updateStoredScoreboard(scoreboardItem) {
  let scoreboardArray = getScoreboard();
  scoreboardArray.push(scoreboardItem);
  localStorage.setItem("scoreboardArray", JSON.stringify(scoreboardArray));
}

//Retrieve scores from local storage and parse it into a javascript object
function getScoreboard() {
  let storedScoreboard = localStorage.getItem("scoreboardArray");
  if (storedScoreboard !== null) {
    let scoreboardArray = JSON.parse(storedScoreboard);
    return scoreboardArray;
  } else {
    scoreboardArray = [];
  }
  return scoreboardArray;
}

//Display scoreboard on score element
function renderScoreboard() {
  let sortedScoreboardArray = sortScoreboard();
  let highScoreList = document.querySelector("#highScoreList");
  highScoreList.innerHTML = "";
  for (let i = 0; i < sortedScoreboardArray.length; i++) {
    let scoreboardEntry = sortedScoreboardArray[i];
    let newListItem = document.createElement("li");
    newListItem.textContent =
      scoreboardEntry.name + " - " + scoreboardEntry.score;
    highScoreList.append(newListItem);
  }
}

//Sort the scoreboard by highscore
function sortScoreboard() {
  let scoreboardArray = getScoreboard();
  if (!scoreboardArray) {
    return;
  }
  scoreboardArray.sort(function (a, b) {
    return b.score - a.score;
  });
  return scoreboardArray;
}

let clearButton = document.querySelector("#clearButton");
clearButton.addEventListener("click", clearHighScores);

//Clear the local storage to erase highscores
function clearHighScores() {
  localStorage.clear();
  renderScoreboard();
}

let backButton = document.querySelector("#backButton");
backButton.addEventListener("click", returnToStart);

//Hide scoreboard card show start card
function returnToStart() {
  hideCards();
  startCard.removeAttribute("hidden");
}

//Link to highscores
let scoreboardLink = document.querySelector("#scoreboardLink");
scoreboardLink.addEventListener("click", showScoreboard);

// Show scoreboard and stop the countdown
function showScoreboard() {
  hideCards();
  scoreboardCard.removeAttribute("hidden");
  clearInterval(intervalID);
  renderScoreboard();
}
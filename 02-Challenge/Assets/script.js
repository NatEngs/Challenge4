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
  
  //Communicate to HTML
  let startCard = document.querySelector("#start-card");
  let questionCard = document.querySelector("#question-card");
  let scoreCard = document.querySelector("#score-card");
  let leaderboardCard = document.querySelector("#leaderboard-card");
  
  //Hide cards as defaul until called upon as the quiz progresses
  function hideCards() {
    startCard.setAttribute("hidden", true);
    questionCard.setAttribute("hidden", true);
    scoreCard.setAttribute("hidden", true);
    leaderboardCard.setAttribute("hidden", true);
  }
  
  let resultDiv = document.querySelector("#result-div");
  let resultText = document.querySelector("#result-text");
  
  //Hide result until called
  function hideResultText() {
    resultDiv.style.display = "none";
  }
  
  //Vars for the variable elements - timer, questions, and time counting down.
  var intervalID;
  var time;
  var currentQuestion;
 
  document.querySelector("#start-button").addEventListener("click", startQuiz);

  //Function to start quiz and remove hidden status of the next question card
  function startQuiz() {
    hideCards();
    questionCard.removeAttribute("hidden");
  
    //assign 0 to currentQuestion when start button is clicked, then display the current question on the page
    currentQuestion = 0;
    displayQuestion();
  
    //Timer starting point for the quiz
    time = 60;
  
    //Function for counting down by 1 second as the interval
    intervalID = setInterval(countdown, 1000);
  
    //Display the time when start of quiz is generated
    displayTime();
  }
  
  //Function for reducing time by 1 second per the interval set above
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
  
  //Question is presented with the available
  function displayQuestion() {
    let question = questions[currentQuestion];
    let options = question.options;
  
    let h2QuestionElement = document.querySelector("#question-text");
    h2QuestionElement.textContent = question.questionText;
  
    for (let i = 0; i < options.length; i++) {
      let option = options[i];
      let optionButton = document.querySelector("#option" + i);
      optionButton.textContent = option;
    }
  }
  
  //behaviour when an answer button is clicked: click event bubbles up to div with id "quiz-options"
  //eventObject.target identifies the specific button element that was clicked on
  document.querySelector("#quiz-options").addEventListener("click", checkAnswer);
  
  //Compare the text content of the option button with the answer to the current question
  function optionIsCorrect(optionButton) {
    return optionButton.textContent === questions[currentQuestion].answer;
  }
  
  let answerGif = document.getElementById("nickCage");
//   let incorrectGif = document.getElementById("nickCage");
  
  //Function for correct answer and wrong answer with Nick Cage surprise
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
      resultText.textContent = "Disappointed Nick Cage...";
      answerGif.src = "./assets/images/incorrect.gif";
      setTimeout(hideResultText, 1250);
      if (time >= 10) {
        time = time - 10;
        displayTime();
      } else {
        //if time is less than 10, display time as 0 and end quiz
        //time is set to zero in this case to avoid displaying a negative number in cases where a wrong answer is submitted with < 10 seconds left on the timer
        time = 0;
        displayTime();
        endQuiz();
      }
    }
  
    //Next question in the array
    currentQuestion++;
    //Progress through the questions until the last one, and then end the quiz
    if (currentQuestion < questions.length) {
      displayQuestion();
    } else {
      endQuiz();
    }
  }
  
  //display scorecard and hide other divs
  const score = document.querySelector("#score");
  
  //at end of quiz, clear the timer, hide any visible cards and display the scorecard and display the score as the remaining time
  function endQuiz() {
    clearInterval(intervalID);
    hideCards();
    scoreCard.removeAttribute("hidden");
    score.textContent = time;
  }
  
  const submitButton = document.querySelector("#submit-button");
  const inputElement = document.querySelector("#initials");
  
  //store user initials and score when submit button is clicked
  submitButton.addEventListener("click", storeScore);
  
  function storeScore(event) {
    //prevent default behaviour of form submission
    event.preventDefault();
  
    //check for input
    if (!inputElement.value) {
      alert("Please enter your initials before pressing submit!");
      return;
    }
  
    //store score and initials in an object
    let leaderboardItem = {
      initials: inputElement.value,
      score: time,
    };
  
    updateStoredLeaderboard(leaderboardItem);
  
    //hide the question card, display the leaderboardcard
    hideCards();
    leaderboardCard.removeAttribute("hidden");
  
    renderLeaderboard();
  }
  
  //updates the leaderboard stored in local storage
  function updateStoredLeaderboard(leaderboardItem) {
    let leaderboardArray = getLeaderboard();
    //append new leaderboard item to leaderboard array
    leaderboardArray.push(leaderboardItem);
    localStorage.setItem("leaderboardArray", JSON.stringify(leaderboardArray));
  }
  
  //get "leaderboardArray" from local storage (if it exists) and parse it into a javascript object using JSON.parse
  function getLeaderboard() {
    let storedLeaderboard = localStorage.getItem("leaderboardArray");
    if (storedLeaderboard !== null) {
      let leaderboardArray = JSON.parse(storedLeaderboard);
      return leaderboardArray;
    } else {
      leaderboardArray = [];
    }
    return leaderboardArray;
  }
  
  //display leaderboard on leaderboard card
  function renderLeaderboard() {
    let sortedLeaderboardArray = sortLeaderboard();
    const highscoreList = document.querySelector("#highscore-list");
    highscoreList.innerHTML = "";
    for (let i = 0; i < sortedLeaderboardArray.length; i++) {
      let leaderboardEntry = sortedLeaderboardArray[i];
      let newListItem = document.createElement("li");
      newListItem.textContent =
        leaderboardEntry.initials + " - " + leaderboardEntry.score;
      highscoreList.append(newListItem);
    }
  }
  
  //sort leaderboard array from highest to lowest
  function sortLeaderboard() {
    let leaderboardArray = getLeaderboard();
    if (!leaderboardArray) {
      return;
    }
  
    leaderboardArray.sort(function (a, b) {
      return b.score - a.score;
    });
    return leaderboardArray;
  }
  
  const clearButton = document.querySelector("#clear-button");
  clearButton.addEventListener("click", clearHighscores);
  
  //clear local storage and display empty leaderboard
  function clearHighscores() {
    localStorage.clear();
    renderLeaderboard();
  }
  
  const backButton = document.querySelector("#back-button");
  backButton.addEventListener("click", returnToStart);
  
  //Hide leaderboard card show start card
  function returnToStart() {
    hideCards();
    startCard.removeAttribute("hidden");
  }
  
  //use link to view highscores from any point on the page
  const leaderboardLink = document.querySelector("#leaderboard-link");
  leaderboardLink.addEventListener("click", showLeaderboard);
  
  function showLeaderboard() {
    hideCards();
    leaderboardCard.removeAttribute("hidden");
  
    //stop countdown
    clearInterval(intervalID);
  
    //assign undefined to time and display that, so that time does not appear on page
    time = undefined;
    displayTime();
  
    //display leaderboard on leaderboard card
    renderLeaderboard();
  }
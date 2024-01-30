//GIVEN I am taking a code quiz
var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');

//WHEN I click(event listener) the start button (what is it referencing/action)
//THEN// a timer starts and I am presented with a question
//function button triggers timer and start of quiz
function generateQuiz(questions, quizContainer, resultsContainer, submitButton)

    function showQuestions(questions, quizContainer) {
        //code here
    }

    function showResults(quetsions, quizContainer, resultsContainer) {
        //code here
    }

    showQuestions(questions, quizContainer);

    submitbutton.onclick = function() {
        showResults(questions, quizContainer, resultsContainer);
    }
//WHEN I answer a question
//THEN I am presented with another question
//function for questions that are tied to click over the right answer
var questionsBank = [
    {
        question = "Select the number 3?",
        answers: {
            a: '0',
            b: '1',
            c: '2',
            d: '3'
        },
        correctAnswer: 'd'
    },
    {
    question: "What is 1 + 1?",
    answers: {
        a: '0',
        b: '1',
        c: '2',
        d: '3'
        },
    correctAnswer: 'c'
    }
],
//Show questions
function showQuestions(questions, quizContainer) {
    var output = [];
    var answers;

    for(var i=0; i<quetions.length; i++){
        answers = [];
    
        for(letter in questions[i].answers) {
            answers.push(
                '<label>'
                    + '<input type="radio" name="question'+i+'"value="'+letter+'">'
                    + letter + ': '
                    + questions[i].answers[letter]
                + '<label>'
            );
        }

        output.push(
            '<div class="question">' + questions[i].question + '</div>'
            + '<div class="answers">' + answers.join('') + '</div>'
            );
    }

    quizContainer.innerHTML = output.join('');
}

function showResults(questions, quizContainer, resultsContainer){

    var answerContainers = quizContainer.querySelectorAll('.answers');

    var userAnswer = '';
    var numCorrect = 0;

    for(car i=0; i<questions.length; i++){

        userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
//if answer is correct
        if(userAnswer===questions[i].correctAnswer){
            numCorrect++;

            answerContainers[i].style.color = 'lightgreen';
        }
    else{
        answerContainers[i].style.color = 'red';
        }
    }
    //show number of correct answers out of total
    resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
}

// on submit, show results
submitButton.onclick = function(){
    showResults(questions, quizContainer, resultsContainer);
}

generateQuiz(questionsBank, quizContainer, resultsContainer, submitButton);
//WHEN I answer a question incorrectly
//THEN time is subtracted from the clock
//function for opposite right answer deducts time off of clock

//WHEN all questions are answered or the timer reaches 0
//THEN the game is over
//if statements to trigger end of quiz

//WHEN the game is over
//THEN I can save my initials and my score
//end of quiz triggers prompt for initial input and logs time
//use JSON for stringify?
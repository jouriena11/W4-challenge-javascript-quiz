
var timeEl = document.querySelector("#countdown");
// var quizEl = document.querySelector("#quiz");
var startBtn = document.querySelector(".start-button");
var quizIntro = document.querySelector(".quiz-intro");
var quizQuestion = document.querySelector(".quiz-question");
var answerBtnDelegate = document.querySelector(".answer-button");
var quiz = document.querySelector("#quiz");

var score = 0

var finalScore = document.querySelector(".final-score-box")
var highScore = document.querySelector(".high-score-box")
var submitScoreBtn = document.querySelector(".submit-score")
var redoQuizBtn = document.querySelector(".return-home")
var clearScoreBtn = document.querySelector(".clear-score")

// var q5Btn = document.querySelector(".q5Btn")
// var q5 = document.querySelector(".q5")

// Quiz Starts

startBtn.addEventListener("click", startQuiz);

// Functions

function startQuiz() {
    setTime();
    quizIntro.style.display = "none";
    console.log("Quiz starts");
    quiz.children[0].style.display = "block";
    answerQuestion();
}

// How to create a loop for this?
function nextQuestion() {
    quiz.children[0].style.display = "none";
    quiz.children[1].style.display = "block";
    console.log("Next question starts.")
    answerQuestion();
}


// q5Btn.addEventListener ("click", () => {
//     quiz.children[4].style.display = "none";
//     finalScore.style.display = "block"
// });

// answerQuestion() function appends an answer comment to the parent element of the button class="answer-button" (i.e., <div class="quiz-box"))

function answerQuestion() {answerBtnDelegate.addEventListener("click", function(event) {
    var target = event.target;
    console.log(target)
    if (target.matches("button")) {
        var commentAppend = document.createElement("div");
        commentAppend.style = "border-top: 2px solid black; margin-top: 20px; line-height: 2; font-size: 1.2rem; font-weight: 700;"

        // if correct (i.e., if button class="correct"), then append "Correct!" message
        if (target.matches(".correct")) {
            commentAppend.textContent = "Correct!";
            } else {
        // if wrong, then append "wrong!" message
            commentAppend.textContent = "Wrong!";
            }

        answerBtnDelegate.parentElement.appendChild(commentAppend);
        }
        setTimeout(nextQuestion, 1000); // Automatically starts the next question after 1 second.
    }, {once: true}); // Without {once: true}, the event would keep firing and appending the comment message to the parent element.
};

// Timer on the top-right corner of the window
// Issue: why doesn't the timer start right away?

var secondsLeft = 60;

function setTime() {
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = "Time: " + secondsLeft;
    if(secondsLeft === 0) {
        clearInterval(timerInterval);
        } // else if {button click on the last question} -- secondsLeft will also become a score
    }, 1000);
}

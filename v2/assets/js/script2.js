
var timeEl = document.querySelector("#countdown");
// var quizEl = document.querySelector("#quiz");
var startBtn = document.querySelector(".start-button");
var quizIntro = document.querySelector(".quiz-intro");
var quizQuestion = document.querySelector(".quiz-question");
var choicesContainer = document.querySelector(".answer");
var choices = Array.from(document.querySelector(".choice-text")); // array.from()
var answerBtnDelegate = document.querySelector(".answer-button");

var score = 0

var questions = [
    {
        question: "Commonly used data types DO NOT include:",
        choice1: "1. Strings",
        choice2: "2. Booleans",
        choice3: "3. Alerts",
        choice4: "4. Numbers",
        answer: 3,
    },
    {
        question: "The condition in an if/else statement is enclosed within ____.",
        choice1: "1. quotes",
        choice2: "2. curly brackets",
        choice3: "3. parentheses",
        choice4: "4. square brackets",
        answer: 3,
    },
    {
        question: "Arrays in JavaScript can be used to store ____.",
        choice1: "1. numbers and strings",
        choice2: "2. other arrays",
        choice3: "3. booleans",
        choice4: "4. all of the above",
        answer: 4
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        choice1: "1. commas",
        choice2: "2. curly brackets",
        choice3: "3. quotes",
        choice4: "4. parentheses",
        answer: 1
    },
    {
        question: "A very useful tool used during development",
        choice1: "1. JavaScript",
        choice2: "2. terminal/bash",
        choice3: "3. for loops",
        choice4: "4. console.log",
        answer: 4
    },
]

var questionsArray = JSON.stringify(questions)
var availableQuestions = []


// startBtn.addEventListener("click", () => {
//     quizIntro.style.display = "none";
//     quiz1.style.visibility = "visible";
//     })

startBtn.addEventListener("click", startQuiz)

function startQuiz() {
    console.log("Quiz starts");
    quizIntro.classList.add("hide");
    // availableQuestion = questionsArray;
    console.log(availableQuestions);
    nextQuestion();
}

answerBtnDelegate.addEventListener("click", function(event) {
    var target = event.target;
    console.log(event.target)
    if (target.matches("button")) {
        
        var commentAppend = document.createElement("div");
        commentAppend.style = "border-top: 2px solid black; margin-top: 20px; line-height: 2; font-size: 1.25rem; font-weight: 700;"

        // if correct, then append "Correct!"
        if (target.matches(".correct")) {
            commentAppend.textContent = "Correct!";
        } else {
        // if wrong, then append "wrong!"
            commentAppend.textContent = "Wrong!";
        }
        
        answerBtnDelegate.parentElement.appendChild(commentAppend);

    }
})

function nextQuesion() {
    var currentQuestion = availableQuestions[i]


    // choices.forEach( choice => {
    //     var number = choice.dataset.number;
    //     choice.innerText = ;
    // })
}

function showquestion(question) {
    quizQuestion.innerText = question.question
}

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

setTime();

// Data of each quiz question is stored in JavaScript object


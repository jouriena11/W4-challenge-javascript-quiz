var timeEl = document.querySelector("#countdown"); // Timer on the top-right corner
var startBtn = document.querySelector(".start-button");
var quizIntro = document.querySelector(".quiz-intro");
var quizEl = document.querySelector("#quiz"); // <div> containing all the quiz quetions
var answerBtnDelegate = document.querySelectorAll(".answer-button"); // <div> containing the answers in each question. There are 5 questions in total, so there are 5 <div class="answer-button"> in total.
var viewHighScore = document.querySelector("#high-score-link"); // View High Score link at the top-left of the page.

var timerInterval; 
var secondsLeft;
var scoreRecords = [];

var finalScore = document.querySelector("#final-score"); 
var finalScoreDiv = document.querySelector(".final-score-box");
var highScore = document.querySelector(".high-score-box"); // <div> containing High Scores
var nameInput = document.querySelector("#initial-text-input"); // entered user's name
var submitScoreBtn = document.querySelector("#submit-score"); // score submit button
var redoQuizBtn = document.querySelector(".return-home"); // Go Back button
var clearScoreBtn = document.querySelector(".clear-score"); // Clear Score button
var scoreHistory = document.querySelector(".score-history"); // <ol> where the submitted scores <li> will be appended to

// Quiz Starts

startBtn.addEventListener("click", startQuiz); // button click = start quiz

function startQuiz() {
    timeEl.style.display = "block";
    setTime();
    quizIntro.style.display = "none";
    console.log("Quiz starts");
    viewHighScore.style.display = "none"; // The simplest way to prevent a user from clicking the link in the middle of the quiz is to hide the link.
    quizEl.children[0].classList.remove("hide"); // display the first question
}

var index = 0;
var nextIndex = 1;

function nextQuestion() {
    if(index <= (quizEl.children.length - 2)) { // This code should run until the quiz question before last only
        quizEl.children[index].classList.add("hide");
        quizEl.children[nextIndex].classList.remove("hide");
        console.log("Question #" + (nextIndex + 1) + " starts.");
        index++;
        nextIndex++;
    } else { // then this code will take over (i.e., no more question), showing the user a final score. 
        quizEl.children[quizEl.children.length - 1].classList.add("hide");
        console.log("Quiz ends here.");
        finalScoreDiv.classList.remove("hide");
        clearInterval(timerInterval); // stops timer
        finalScore.textContent = "Your final score is " + secondsLeft + ".";
    }
}

// Timer on the top-right corner of the web app

function setTime() {
    secondsLeft = 60;
    timerInterval = setInterval(() => {
    secondsLeft--;
    timeEl.textContent = "Time: " + secondsLeft;

    if(secondsLeft === 0) { // prevents timer from displaying negative number
        clearInterval(timerInterval);
        }
    }, 1000);
}

// Submit score event

submitScoreBtn.addEventListener("click", () => {
    if(nameInput.value === '') {
        alert("Please enter your name."); // an alert message will appear if the user submit a blank nameInput
    }
    else {
        index = 0; // resetting the index value for use in nextQuestion function when redoing the quiz without refreshing the page. There will be an error, otherwise.
        nextIndex = 1; // resetting the nextIndex value for use in nextQuestion function when redoing the quiz without refreshing the page. There will be an error, otherwise.
        storeRecord();
        showHighScore();
        renderHighScores();
    }
})

function storeRecord() { // Store the user's name and score to the localStorage
    scoreRecords.push({
        name: nameInput.value.trim(),
        score: secondsLeft,
    })

    localStorage.setItem("High Score", JSON.stringify(scoreRecords));
    nameInput.value = ''; // clear the input field right after the data is saved to the localStorage
}

function showHighScore() {
    timeEl.style.display = "none";
    finalScoreDiv.classList.add("hide");
    highScore.classList.remove("hide");
}

function renderHighScores() {
    scoreHistory.innerHTML = ''; // This clears the <li> elements that have previously been created and prevent duplicates. The following loop will regenerate the <li> elements 
    scoreRecords.sort((a, b) => b.score-a.score) // the highest score (in the localStorage) would appear at the top
    for (var i = 0; i < scoreRecords.length; i++) {
        var scoreEntry = scoreRecords[i];

        var li = document.createElement("li");
        li.textContent = scoreEntry.name + " - " + scoreEntry.score;
        li.setAttribute("class", "high-score-entry");
        scoreHistory.appendChild(li); // append <li> elements with the generated content from line 105 to the <ol> parent element
      }
    }

viewHighScore.addEventListener("click", () => { // This code will run when the View High Score link is clicked.
    quizIntro.style.display = "none";
    showHighScore();
    renderHighScores();
});

clearScoreBtn.addEventListener("click", clearScore); // When the Clear High Score button is clicked, clearScore() function will be invoked.

function clearScore() {
    scoreRecords = []; // clear the scoreRecords array
    localStorage.setItem("High Score", JSON.stringify(scoreRecords)); // clear the localStorage with an empty array
    scoreHistory.innerHTML = ""; // clear all the children element inside <ol> (i.e., all the <li> score records)
}

redoQuizBtn.addEventListener("click", redoQuiz) // When clicking on Go Back button, the redoQuiz() function will be invoked.

function redoQuiz(){
        highScore.classList.add("hide");
        quizIntro.style.display = "block";
        viewHighScore.style.display = "block";
    }

// Without this function, new name and score entry will replace the previous record.
function init() {
    var scores = JSON.parse(localStorage.getItem("High Score")); // retreive the 
    if (scores !== null) {
      scoreRecords = scores;
    }

    // The purpose of the following loops is to apply addEventListener to each button in each quiz question
    // The purpose of the first loop is to identify the answer buttons in each question
    for(var i = 0; i < answerBtnDelegate.length; i++) { // answerBtnDelegate = [<div.answer-button>, <div.answer-button>, <div.answer-button>, <div.answer-button>, <div.answer-button>]
        var childrenButton = answerBtnDelegate[i].children; // the children of each <div.answer-button> = [<button>, <button>, <button>, <button>]
        console.log(childrenButton);
        for(var j = 0; j < childrenButton.length; j++) { // This loops then applies the addEventListener to each individual answer button.
            childrenButton[j].addEventListener("click", function(event) {
                var target = event.target;
            
                var commentAppend = document.createElement("div");
                commentAppend.style = "border-top: 2px solid black; margin-top: 20px; line-height: 2; font-size: 1.2rem; font-weight: 700;"
                
                if (target.matches(".correct")) { // if correct (i.e., button class="correct"), then append "Correct!" message
                    commentAppend.textContent = "Correct!";
                    } else {
                    commentAppend.textContent = "Wrong!"; // if wrong, then append "wrong!" message
                    
                    if (secondsLeft <= 10) { // To prevent the remaining time showing a negative number, the condition is set so that if the remaining time is less than or equal to 10, then the seconds left becomes 0 when a wrong answer is chosen.
                        secondsLeft = 0; // 
                    } else {
                        secondsLeft -= 10; // Penalty: 10 seconds are deducted from the remaining time if given a wrong answer
                    }}
                
                event.target.parentElement.appendChild(commentAppend); // append the Correct/Wrong message to <div.answer-button>
                
                setTimeout(() => { // Automatically starts the next question after 0.5 second.
                    commentAppend.remove();
                    nextQuestion();
                }, 500);
            });
        }
        
    }

  }

  init();

  
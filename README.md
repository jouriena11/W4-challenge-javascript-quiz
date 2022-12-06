# W4-challenge-javascript-quiz
Online quiz with countdown timer and high score record stored in local storage

The following code gives the same result
var questionsArr = [...questions]; // spread operator
var questionArr2 = JSON.stringify(questions)

console.log(questionsArr)
console.log(JSON.stringify(questions))
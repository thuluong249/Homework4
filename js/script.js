//declare the variables needed to access all relevant elements from the html
var timerDisplay = document.querySelector("#timer");
var mainEl = document.querySelector("main");
var quizBox = document.querySelector(".quizBox");
var myButton = document.querySelector(".myButton");
var highScore = document.querySelector(".highScore");
var answerOptions = document.querySelector(".answerButtons");
var result = document.querySelector("#result");
var score = document.querySelector("#score");
var gameOverScreen = document.querySelector(".gameOver");

var currentIndex = 0;
var wins = 0;

var option1 = document.createElement("button");
var option2 = document.createElement("button");
var option3 = document.createElement("button");
var option4 = document.createElement("button");

option1.classList.add("btn");
option2.classList.add("btn");
option3.classList.add("btn");
option4.classList.add("btn");

answerOptions.appendChild(option1);
answerOptions.appendChild(option2);
answerOptions.appendChild(option3);
answerOptions.appendChild(option4);

function rulesFirst() {
     var rulesFirst = document.createElement("p");
     rulesFirst.setAttribute("style", "margin-bottom: 12px");
     rulesFirst.setAttribute("id", "rulesFirst");
     rulesFirst.textContent = "Choose the correct answer of the following Javascript related questions within the time limit. Please keep in mind that the incorrect answers will substract 10 seconds from the timer!";
     quizBox.appendChild(rulesFirst);
     var startButton = document.createElement("button");
     startButton.innerHTML = "Start Quiz";
     startButton.setAttribute("id", "startButton");
     //add styling to button using exisiting class in CSS
     startButton.classList.add("btn");
     myButton.appendChild(startButton);
     startButton.addEventListener("click", startQuiz);
}

//Set countdown timer to 45 seconds, start countdown function
var timeLeft = 45;
function updateTimer() {
     timerInterval = setInterval(function () {
          //when timer reaches zero, clear interval function and display game over
          if (timeLeft === 0) {
               clearInterval(timerInterval);
               gameOver();
          } else {
               timeLeft--;
               timerDisplay.textContent = timeLeft + " seconds left";
          }
     }, 1000);
}

//function to clear display and display game over when timer runs out or questions are finished
function gameOver() {
     timerDisplay = '';
     var gameOver = document.createElement("p");
     var yourScore = document.createElement("p");
     var inputWhat = document.createElement("span");
     var userInput = document.createElement("input");
     var submitButton = document.createElement("button");

     submitButton.classList.add("btn");

     userInput.type = "text";
     userInput.value = "";
     userInput.classList.add("userInput");

     gameOver.textContent = "Game Over!";
     yourScore.textContent = "Your final score is: " + wins;
     inputWhat.textContent = "Enter initials: ";
     submitButton.innerHTML = "Submit";


     gameOverScreen.appendChild(gameOver);
     gameOverScreen.appendChild(yourScore);
     gameOverScreen.appendChild(inputWhat);
     gameOverScreen.appendChild(userInput);
     myButton.appendChild(submitButton);


     submitButton.addEventListener("click", function (event) {
          event.preventDefault();
          if (userInput.value.length === 0) {
               alert("Please enter initials before submitting");
          } else {

               localStorage.setItem("name", userInput.value);
               localStorage.setItem("score", wins);
               window.location.href = "highscore.html";
          }
     });

     answerOptions.remove();
     quizBox.remove();
}

//function to start quiz
function startQuiz() {
     //start timer, remove the rules and start button created earlier
     updateTimer();
     var rules = document.querySelector("#rulesFirst");
     rules.remove();
     var startButton = document.querySelector("#startButton");
     startButton.remove();
     //call function that will call the questions
     getQuestion();
}

//function to go through all the questions
function getQuestion() {
     currentQuestion = theQuestions[currentIndex];
     quizBox.textContent = currentQuestion.question;

     //make answer buttons visible, add text content and click event
     answerOptions.classList.remove("visibility");

     option1.textContent = currentQuestion.choice1;
     option2.textContent = currentQuestion.choice2;
     option3.textContent = currentQuestion.choice3;
     option4.textContent = currentQuestion.choice4;

     option1.addEventListener("click", selectAnswer);
     option2.addEventListener("click", selectAnswer);
     option3.addEventListener("click", selectAnswer);
     option4.addEventListener("click", selectAnswer);
}


//function to be called when answer buttons are clicked
function selectAnswer(event) {
     //set variable for the current target of the click event
     var clicked = event.currentTarget.textContent;

     if (clicked === currentQuestion.answer) {
          result.textContent = "Correct Answer!";
          wins++;
          score.textContent = "Score: " + wins;
     }
     else {
          result.textContent = "Wrong answer!";
          timeLeft -= 10;
     }
     //if statement to stop looping through questions and end game if all questions have been looped through
     if (currentIndex === theQuestions.length - 1) {
          //gameOver();
          timeLeft = 0
     }
     else {
          currentIndex++
          getQuestion()
     }

}

//Created variable which is array of all questions and answers
var theQuestions = [
     {
          question: "Which type of Javascript language is?",
          choice1: "Object-Oriented",
          choice2: "Object-Based",
          choice3: "Assembly-language",
          choice4: "High-level",
          answer: "Object-Based"
     },
     {
          question: "Which of the following variables takes precedence over the others if the name are the same?",
          choice1: "Global variable",
          choice2: "The local element",
          choice3: "The two of the above",
          choice4: "None of the above",
          answer: "The local element"
     },
     {
          question: "Which one of the following is the correct for calling the Javascript code?",
          choice1: "Proprocessor",
          choice2: "Triggering Event",
          choice3: "RMI",
          choice4: "Function/Method",
          answer: "Function/Method"
     },
     {
          question: "In Javascript the x===y statement implies that?",
          choice1: "Both x and y are equal in value, type and reference address as well",
          choice2: "Both x and y are equal in value only",
          choice3: "Both are equal in the value and data type",
          choice4: "Both are not the same at all",
          answer: "Both are equal in the value and data type"
     },
     {
          question: "What are variables used for in Javascript Programs?",
          choice1: "Storing numbers, dates or other values",
          choice2: "Varying ramdomly",
          choice3: "Causing high-school algebra flashbacks",
          choice4: "None of the above",
          answer: "Storing numbers, dates or other values"
     }
];

rulesFirst();


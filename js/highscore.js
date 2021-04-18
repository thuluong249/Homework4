//declare all the variables needed to access all relevant HTML elements
var theDisplay = document.querySelector("#scoreDisplay");
var buttons = document.querySelector(".theButtons");

//function to retrieve high score date from local storage, adding buttons and click events
function renderHighScore () {

   var lastHS = localStorage.getItem("score");
   var theName = localStorage.getItem("name");

    var name = document.createElement("p");
    if (theName === null) {
        name.textContent = "Name: ";
    } else {
    name.textContent = "Name: " + theName;
    }
    theDisplay.appendChild(name);

    var score = document.createElement("p");

    if (lastHS === null) {
        score.textContent = "High Score: ";
    } else {
    score.textContent = "High Score: " + lastHS;
    }
    theDisplay.appendChild(score);
  
    var resetButton = document.createElement("button");
    var clearButton = document.createElement("button");
    resetButton.classList.add("btn");
    clearButton.classList.add("btn");
    resetButton.textContent = "Restart Quiz";
    clearButton.textContent = "Clear High Score";

    buttons.appendChild(resetButton);
    buttons.appendChild(clearButton);

    resetButton.addEventListener("click", function(event) { 
     event.preventDefault();
     window.location.href = "index.html";
    });

    clearButton.addEventListener("click", function (event) {
        event.preventDefault();
        name.textContent = "Name: ";
       score.textContent = "highScore: ";
       localStorage.clear();
    })
}

renderHighScore();


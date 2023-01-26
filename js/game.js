const game = {
    init: function () {
      // For each choice listens to the click and launches the game
      let choicesElmts = document.querySelectorAll(".container__game");
      for (choice of choicesElmts) {
        choice.addEventListener("click", game.playGame);
      }
  
      // Listens to the click on "play again" button and displays the board game
      const playAgainElmt = document.querySelector(
        ".results__result__play-again"
      );
      playAgainElmt.addEventListener("click", () => {
        game.switchBoards();
        game.reinitializeResultsBoard();
      });
  
      // Initializes score
      game.showScore();
    },
  
    /* Gets the choices picked by the user and the computer */
    async playGame(event) {
      // Gets the choice picked by the user: color + shape
      let userColor = event.currentTarget.getAttribute("id");
      let userShape = event.currentTarget.dataset.shape;
  
      // Gets the choice picked by the computer: color + shape
      let computerColor = game.computerPicks();
      let computerShape = document.querySelector("#" + computerColor).dataset
        .shape;
  
      // Calls switchBoards
      game.switchBoards();
  
      // Calls displayUserChoice
      game.displayUserChoice(userColor, userShape);
  
      // After a little time
      await game.delay(2000);
  
      // Calls displayComputerChoice
      game.displayComputerChoice(computerColor, computerShape);
  
      // Calls compareChoices
      game.compareChoices(userShape, computerShape);
    },
  
    /* Compares choices and designates winner
     Calls function to update score*/
    compareChoices(userShape, computerShape) {
      if (userShape === computerShape) {
        game.displayResult("Draw");
      } else if (
        (userShape === "paper" && computerShape === "scissors") ||
        (userShape === "rock" && computerShape === "paper") ||
        (userShape === "scissors" && computerShape === "rock")
      ) {
        game.displayResult("You lose");
        game.updateScore(-1);
      } else {
        game.displayResult("You win");
        game.updateScore(1);
      }
    },
  
    /* Makes computer pick a color */
    computerPicks() {
      const choices = ["blue", "yellow", "red"];
      let computerPick = Math.floor(Math.random() * choices.length);
      return choices[computerPick];
    },
  
    /* Initializes score */
    showScore() {
      if (sessionStorage.getItem("score") == null) {
        sessionStorage.setItem("score", 0);
      }
      let score = parseInt(sessionStorage.getItem("score"));
      game.displayScore(score);
    },
  
    /* Updates score */
    updateScore(a) {
      // Gets score for session storage
      let score = parseInt(sessionStorage.getItem("score"));
  
      // Updates score
      score += a;
  
      // Log updated score into session storage
      sessionStorage.setItem("score", score);
  
      // Calls displayscore
      game.displayScore(score);
    },
  
    /* Displays score */
    displayScore(score) {
      scoreElmt = document.querySelector(".header__score__points");
      scoreElmt.innerText = score;
    },
  
    /* Displays user's choice */
    displayUserChoice(userColor, userShape) {
      // user's choice: image + shape
      userCircleElmt = document.querySelector(".user .results__choice__logo");
      userCircleElmt.classList.remove("red", "yellow", "blue");
      userCircleElmt.classList.add(userColor);
  
      userImgElmt = userCircleElmt.querySelector("img");
      userImgElmt.src = "images/icon-" + userShape + ".svg";
      userImgElmt.alt = userShape + " logo";
  
      // Removes dark-blue class from computer loading circle
      game.waitingForComp();
    },
  
    /* Adds / Removes class dark-blue */
    waitingForComp() {
      wrapperElmt = document.querySelector(
        ".results__choice__logo__wrapper-comp"
      );
      wrapperElmt.classList.toggle("dark-blue");
    },
  
    /* Returns a promise that will revolve when the time has passed */
    delay(time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    },
  
    /* Displays computer's choice */
    displayComputerChoice(computerColor, computerShape) {
      // Removes "dark-blue"
      game.waitingForComp();
  
      // Displays computer's choice: color + shadow + shape
  
      // Color + shadow
      const computerCircleElmt = document.querySelector(
        ".computer .results__choice__logo"
      );
      computerCircleElmt.classList.add(computerColor);
      computerCircleElmt.classList.add("shadow");
  
      // Image
      computerImgElmt = computerCircleElmt.querySelector("img");
      computerImgElmt.src = "images/icon-" + computerShape + ".svg";
      computerImgElmt.alt = computerShape + " logo";
    },
  
    /* Shows / hides the element for text result */
    resultShowHide() {
      // Remove / add class opaque
      // Remove / add class appear
      resultElmt = document.querySelector(".results__result");
      resultElmt.classList.toggle("opaque");
      resultElmt.classList.toggle("appear");
    },
  
    /* Writes down whether the user won */
    displayResult(result) {
      // Calls resultsShowHide to show results
      game.resultShowHide();
  
      // Writes the result
      const resultTxtElmt = document.querySelector(".results__result__text");
      resultTxtElmt.innerText = result;
    },
  
    reinitializeResultsBoard() {
      game.resultShowHide();
  
      const computerCircleElmt = document.querySelector(
        ".computer .results__choice__logo"
      );
      computerCircleElmt.classList.remove("red", "yellow", "blue");
      computerCircleElmt.classList.remove("shadow");
      computerImgElmt = computerCircleElmt.querySelector("img");
      computerImgElmt.src = "";
      computerImgElmt.alt = "";
    },
  
    /* Switches between game board and results area */
    switchBoards() {
      // Hides / shows game area
      gameElmt = document.querySelector(".container");
      gameElmt.classList.toggle("hidden");
  
      // Hides / shows results area
      resultsElmt = document.querySelector(".results");
      resultsElmt.classList.toggle("hidden");
    },
  };
const wordDisplay = document.querySelector(".word-display");
const hangManImage = document.querySelector(".hang-man-box img");
const keyboard = document.querySelector(".keyboard");
let guessValue = document.querySelector(".count");
const gameModal = document.querySelector(".game-modal");
const playAgain = document.querySelector(".play-again");

let currentWord,
  correctLetters = [],
  wrongGuessCount = 0;
const maxGussses = 6;
// getting random word and hitns
const getRandomWord = () => {
  let random = Math.floor(Math.random() * wordList.length);
  const { word, hint } = wordList[random];
  currentWord = word;
  document.querySelector(".hint-text span").innerText = hint;
  wordDisplay.innerHTML = word
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");
};
getRandomWord();
// game over function
const gameOver = (isVictory) => {
  setTimeout(() => {
    gameModal.classList.add("show");
    gameModal.querySelector("img").src = `./assets/images/${
      isVictory ? "victory" : "lost"
    }.gif`;
    gameModal.querySelector("h4").innerText = `${
      isVictory ? "Congratulations" : "Game Over"
    }`;
    gameModal.querySelector("p").innerText = `${
      isVictory ? "You have guessed the Word :  " : "The Correct word was : "
    } ${currentWord}`;
  }, 300);
};
const initGame = (button, clickedLetter) => {
  // checking the letter is exists in the letter or not
  if (currentWord.includes(clickedLetter)) {
    // showing the letter if it correct
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        correctLetters.push(letter);
        wordDisplay.querySelectorAll("li")[index].innerText =
          letter.toUpperCase();
        wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
      }
    });
  } else {
    // for wrong guess countguess value and change hang-man image
    wrongGuessCount++;
    button.disabled = true;
    hangManImage.src = `./assets/images/hangman-${wrongGuessCount}.svg`;
    guessValue.innerText = wrongGuessCount;
  }
  // call game over function according to these conditions
  if (wrongGuessCount === maxGussses) return gameOver(false);
  if (correctLetters.length === currentWord.length) return gameOver(true);
};
// Creating keyboard button
for (let keyboardButton = 97; keyboardButton <= 122; keyboardButton++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(keyboardButton);
  keyboard.appendChild(button);
  button.addEventListener("click", (e) =>
    initGame(e.target, String.fromCharCode(keyboardButton))
  );
}
playAgain.addEventListener("click", () => {
  document.location.reload(true);
});
const refreash = document.querySelector(".refreash");
refreash.addEventListener("click", () => {
  document.location.reload(true);
});

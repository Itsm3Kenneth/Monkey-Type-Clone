const quotes = [
  "There is nothing more deceptive than an obvious fact",
  "I never make exceptions an exception disproves the rule",
  "What one man can invent another can discover",
  "Nothing clears up a case so much as stating it to another person",
  "Those who inherited the curse of the Zen'in family",
  "The one who couldn’t fully leave behind that curse",
  "hey would all bear witness to the bare flesh of the one who is free",
  "To the one who left it all behind and his overwhelming intensity!",
];
const letters = [
  "over",
  "here",
  "deconstruction",
  "one",
  "man",
  "another",
  "education",
  "it",
  "a",
  "train",
  "deduction",
  "truth",
  "there",
  "monkey",
  "clone",
  "money",
  "magic",
  "lantern",
  "program",
  "pickle",
  "chocolate",
  "transform",
  "walking",
  "dead",
  "solo",
  "i",
  "love",
  "you",
];

const toggledBtn = document.querySelector(".toggle");
const curreentTime = document.querySelector(".time");
const fastestTime = document.querySelector(".fastest-score");
const currentWords = document.querySelector(".spelling-words");
const inputFeild = document.querySelector(".input-feild");
const startBtn = document.querySelector(".start");
const restartBtn = document.querySelector(".restart");
const localStoreageTime = localStorage.getItem("highScore");
let startTime = Date.now;
let highScore = 0;
let words = [];
let currentNthChild = 0;
let toggled = false;

if (localStoreageTime) {
  fastestTime.textContent = `FASTEST SCORE: ${localStoreageTime}s`;
  highScore = localStoreageTime;
  console.log(highScore);
}

toggledBtn.addEventListener("click", () => {
  toggled = toggled ? false : true;
  if (toggled) {
    resetGame();
    currentWords.textContent = "*WORDS*";
  } else {
    resetGame();
  }
});

startBtn.addEventListener("click", () => {
  resetGame();
  if (toggled) {
    quoteGenarator(letters);
  } else {
    quoteGenarator(quotes);
  }
});

inputFeild.addEventListener("input", () => {
  rendergame();
});

restartBtn.addEventListener("click", () => {
  localStorage.removeItem("highScore");
  fastestTime.textContent = `FASTEST SCORE:`;
  resetGame();
});

const resetGame = () => {
  currentWords.textContent = "*SENTENCES*";
  curreentTime.textContent = "TIME:";
  startTime = Date.now;
  words = [];
  currentNthChild = 0;
  for (const wordElement of currentWords.childNodes) {
    wordElement.className = "";
  }
};

function quoteGenarator(arr) {
  let appendWord = "";
  if (toggled) {
    for (let i = 0; i < 12; i++) {
      let ranNum = Math.floor(Math.random() * letters.length);
      appendWord += `<span>${arr[ranNum]} </span>`;
      words.push(arr[ranNum]);
    }
    console.log(words);
    currentWords.innerHTML = appendWord;
  } else {
    const qouteIndex = Math.floor(Math.random() * arr.length);
    const quote = arr[qouteIndex];
    words = quote.split(" ");
    let appendWord = "";
    for (let i = 0; i < words.length; i++) {
      appendWord += `<span>${words[i]} </span>`;
    }
    currentWords.innerHTML = appendWord;
  }
  startTime = new Date().getTime();
}

function rendergame() {
  const currentWord = words[currentNthChild];
  const typedValue = inputFeild.value;

  if (typedValue === currentWord && currentNthChild === words.length - 1) {
    const elapsedTime = new Date().getTime() - startTime;
    const secondsConversion = elapsedTime / 1000;
    curreentTime.textContent = `TIMES: ${secondsConversion}s`;
    console.log(secondsConversion);
    console.log(highScore);
    if (secondsConversion < highScore || highScore == 0) {
      highScore = secondsConversion;
      localStorage.setItem("highScore", highScore);
      fastestTime.textContent = `FASTEST SCORE: ${highScore}s`;
    }
  } else if (typedValue.endsWith(" ") && typedValue.trim() === currentWord) {
    inputFeild.value = "";
    currentWords.childNodes[currentNthChild].className = "correct";
    currentNthChild++;
  }
}

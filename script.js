const quizData = [
  {
    question:
      "Which of the following is a correct syntax to display “Hello World” in an alert box using JavaScript?",
    options: [
      "alertBox('Hello World');",
      "alert('Hello World');",
      "msgAlert('Hello World');",
      "displayAlert('Hello World');",
    ],
    answer: "alert('Hello World');",
  },
  {
    question: "What is the purpose of JavaScript in web development?",
    options: [
      "To structure web pages",
      "To style web pages",
      "To add interactivity and dynamic content to web pages",
      "To store data on the server",
    ],
    answer: "To add interactivity and dynamic content to web pages",
  },
  {
    question:
      "Which keyword is used for declaring a variable in JavaScript that can be reassigned?",
    options: ["const", "var", "let", "static"],
    answer: "let",
  },
  {
    question: "In JavaScript, which of the following is a valid variable name?",
    options: ["2names", "$name", "-name", "name2"],
    answer: "$name",
  },
  {
    question:
      "Which data type in JavaScript is used to represent logical values?",
    options: ["String", "Boolean", "Number", "Undefined"],
    answer: "Boolean",
  },
  {
    question: "What does the undefined value in JavaScript represent?",
    options: [
      "An unassigned variable",
      "A null value",
      "A logical false",
      "An error condition",
    ],
    answer: "An unassigned variable",
  },
  {
    question:
      "What will be the output of the following code? console.log(typeof null);",
    options: ["'object'", "'null'", "'undefined'", "'number'"],
    answer: "'object'",
  },
  {
    question: "Which of the following is an example of a loosely typed language?",
    options: ["Java", "C++", "JavaScript", "Python"],
    answer: "JavaScript",
  },
  {
    question: "Which operator is used to check both the value and the type of a variable in JavaScript?",
    options: [
      "==",
      "===",
      "!=",
      "!==",
    ],
    answer: "===",
  },
  {
    question: "Which statement is used to execute a block of code multiple times in JavaScript?",
    options: ["for", "if", "return", "break"],
    answer: "for",
  },
];

const quizContainer = document.getElementById("quiz");
const resultContainer = document.getElementById("result");
const submitButton = document.getElementById("submit");
const retryButton = document.getElementById("retry");
const showAnswerButton = document.getElementById("showAnswer");

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement("div");
  questionElement.className = "question";
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement("div");
  optionsElement.className = "options";

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement("label");
    option.className = "option";

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "quiz";
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = "";
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = "none";
  submitButton.style.display = "none";
  retryButton.style.display = "inline-block";
  showAnswerButton.style.display = "inline-block";
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = "block";
  submitButton.style.display = "inline-block";
  retryButton.style.display = "none";
  showAnswerButton.style.display = "none";
  resultContainer.innerHTML = "";
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = "none";
  submitButton.style.display = "none";
  retryButton.style.display = "inline-block";
  showAnswerButton.style.display = "none";

  let incorrectAnswersHtml = "";
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
  }

  resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
}

submitButton.addEventListener("click", checkAnswer);
retryButton.addEventListener("click", retryQuiz);
showAnswerButton.addEventListener("click", showAnswer);

displayQuestion();

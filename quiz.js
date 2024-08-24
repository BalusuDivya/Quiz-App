const quizContainer = document.querySelector(".quiz-container");
const questionEl = document.querySelector(".quiz-container .question");
const optionsEl = document.querySelector(".quiz-container .options");
const nextBtn = document.querySelector(".quiz-container .next-btn");
const quizResult = document.querySelector(".quiz-result");
const resultHeading = document.getElementById("result-heading");
const questionsSummary = document.getElementById("questions-summary");
const timerEl = document.querySelector(".timer");

let questionNumber = 0;
let score = 0;
const Max_questions = 5;
let userAnswers = [];
let timer;
let timeLeft = 10;

let quizData = [
    {
        question: "What does HTTP stand for?",
        a: "HyperText Transfer Protocol",
        b: "HyperText Transmission Protocol",
        c: "HyperText Transfer Procedure",
        d: "HyperText Transfer Package",
        correct: "a",
    },
    {
        question: "What is the main purpose of a DOCTYPE in HTML?",
        a: "To specify the HTML version",
        b: "To link to a CSS file",
        c: "To define the document title",
        d: "To include meta tags",
        correct: "a",
    },
    {
        question: "What is the purpose of the 'alt' attribute in HTML?",
        a: "To provide alternative text for an image",
        b: "To link an image to another page",
        c: "To style the image with CSS",
        d: "To align the image on the page",
        correct: "a",
    },
    {
        question: "Which CSS property is used to change the background color of an element?",
        a: "background-color",
        b: "color",
        c: "background-image",
        d: "bg-color",
        correct: "a",
    },
    {
        question: "Which JavaScript method is used to write on the browser's console?",
        a: "console.log()",
        b: "console.write()",
        c: "document.write()",
        d: "window.log()",
        correct: "a",
    },
];

const shuffleArray = (array) => array.slice().sort(() => Math.random() - 0.5);

const startTimer = () => {
    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            showResult();
        }
    }, 1000);
};

const loadQuestion = () => {
    clearInterval(timer);
    timeLeft = 10; // Reset timer for each question
    timerEl.textContent = timeLeft;
    startTimer();

    const currentQuestionData = quizData[questionNumber];
    questionEl.textContent = currentQuestionData.question;
    optionsEl.innerHTML = `
        <button class="option" onclick="selectAnswer('a')">${currentQuestionData.a}</button>
        <button class="option" onclick="selectAnswer('b')">${currentQuestionData.b}</button>
        <button class="option" onclick="selectAnswer('c')">${currentQuestionData.c}</button>
        <button class="option" onclick="selectAnswer('d')">${currentQuestionData.d}</button>
    `;
};

const selectAnswer = (answer) => {
    const currentQuestionData = quizData[questionNumber];
    userAnswers.push(answer);

    if (answer === currentQuestionData.correct) {
        score++;
    }

    // Disable options after selection
    const options = document.querySelectorAll(".option");
    options.forEach(option => {
        option.classList.add("disabled");
        if (option.textContent === currentQuestionData[currentQuestionData.correct]) {
            option.classList.add("correct");
        } else if (option.textContent === currentQuestionData[answer]) {
            option.classList.add("incorrect");
        }
    });

    clearInterval(timer); // Stop the timer on answer selection

    if (questionNumber < Max_questions - 1) {
        nextBtn.style.display = "block"; // Show next button
    } else {
        nextBtn.textContent = "Finish";
    }
};

const showResult = () => {
    quizContainer.style.display = "none"; // Hide quiz container
    quizResult.style.display = "flex"; // Show result container
    resultHeading.textContent = `You scored ${score} out of ${Max_questions}!`;

    userAnswers.forEach((answer, index) => {
        const questionContainer = document.createElement("div");
        questionContainer.classList.add("question-container");

        const questionData = quizData[index];
        questionContainer.innerHTML = `
            <span class="question-number">Question ${index + 1}:</span> ${questionData.question} <br>
            Your answer: ${questionData[answer]} <br>
            Correct answer: ${questionData[questionData.correct]} 
        `;

        if (answer === questionData.correct) {
            questionContainer.classList.add("correct");
        } else {
            questionContainer.classList.add("incorrect");
        }
        
        questionsSummary.appendChild(questionContainer);
    });
};

nextBtn.addEventListener("click", () => {
    questionNumber++;

    if (questionNumber < Max_questions) {
        loadQuestion();
    } else {
        showResult();
    }
});

// Initialize quiz
loadQuestion();

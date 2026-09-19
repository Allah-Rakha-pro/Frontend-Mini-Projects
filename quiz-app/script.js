const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

const startButton = document.getElementById('start-btn');

const questionText = document.getElementById('question-text');
const answerContainer = document.getElementById('answers-container');

const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionSpan = document.getElementById('total-question');

const scoreSpan = document.getElementById('score');
const finalScoreSpan = document.getElementById('final-score');
const maxScoreSpan = document.getElementById('max-score');

const restartButton = document.getElementById('restart-btn');
const progressBar = document.getElementById('progress');

const resultMessage = document.getElementById('result-message');
const quizQuestion = [
    {
        question: "Which is the largest planet in our Solar System?",
        answers: [
            { text: 'Earth', correct: false },
            { text: 'Mars', correct: false },
            { text: 'Jupiter', correct: true },
            { text: 'Venus', correct: false }
        ]
    },

    {
        question: "What is the capital city of France?",
        answers: [
            { text: 'London', correct: false },
            { text: 'Paris', correct: true },
            { text: 'Rome', correct: false },
            { text: 'Berlin', correct: false }
        ]
    },

    {
        question: "How many continents are there on Earth?",
        answers: [
            { text: '5', correct: false },
            { text: '6', correct: false },
            { text: '7', correct: true },
            { text: '8', correct: false }
        ]
    },

    {
        question: "Which ocean is the largest in the world?",
        answers: [
            { text: 'Atlantic Ocean', correct: false },
            { text: 'Indian Ocean', correct: false },
            { text: 'Arctic Ocean', correct: false },
            { text: 'Pacific Ocean', correct: true }
        ]
    },

    {
        question: "Who painted the Mona Lisa?",
        answers: [
            { text: 'Vincent van Gogh', correct: false },
            { text: 'Leonardo da Vinci', correct: true },
            { text: 'Pablo Picasso', correct: false },
            { text: 'Michelangelo', correct: false }
        ]
    },

    {
        question: "What is the chemical symbol for gold?",
        answers: [
            { text: 'Ag', correct: false },
            { text: 'Fe', correct: false },
            { text: 'Au', correct: true },
            { text: 'Cu', correct: false }
        ]
    },

    {
        question: "Which animal is known as the King of the Jungle?",
        answers: [
            { text: 'Tiger', correct: false },
            { text: 'Elephant', correct: false },
            { text: 'Lion', correct: true },
            { text: 'Leopard', correct: false }
        ]
    },

    {
        question: "How many days are there in a leap year?",
        answers: [
            { text: '364', correct: false },
            { text: '365', correct: false },
            { text: '366', correct: true },
            { text: '367', correct: false }
        ]
    },

    {
        question: "Which is the fastest land animal?",
        answers: [
            { text: 'Lion', correct: false },
            { text: 'Cheetah', correct: true },
            { text: 'Horse', correct: false },
            { text: 'Leopard', correct: false }
        ]
    },

    {
        question: "Which gas do humans need to breathe to survive?",
        answers: [
            { text: 'Carbon Dioxide', correct: false },
            { text: 'Hydrogen', correct: false },
            { text: 'Oxygen', correct: true },
            { text: 'Nitrogen', correct: false }
        ]
    }
];


// Quiz state

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;


// Event listeners

startButton.addEventListener("click", quizStart);
restartButton.addEventListener("click", restartQuiz);


// Set quiz information

totalQuestionSpan.textContent = quizQuestion.length;
maxScoreSpan.textContent = quizQuestion.length;


// Start Quiz

function quizStart() {

    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = 0;
    startScreen.classList.remove("active");
    quizScreen.classList.add("active");
    showQuestion();

}

// Restart Quiz

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = 0;
    startScreen.classList.add('active');
    quizScreen.classList.remove('active');


}
function showQuestion() {
    //reset
    answersDisabled = false;
    const currentQuestion = quizQuestion[currentQuestionIndex];
    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    const progressPercent = (currentQuestionIndex / quizQuestion.length) * 100;
    progressBar.style.width = progressPercent + "%";
    //50%
    questionText.textContent = currentQuestion.question;
    //todo: explain this in a second
    answerContainer.innerHTML = ""

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button")
        button.textContent = answer.text
        button.classList.add("answer-btn");

        //what is the dataset?
        button.dataset.correct = answer.correct;

        button.addEventListener('click', selectAnswer);
        answerContainer.appendChild(button);

    });



}
function selectAnswer(event) {
    if (answersDisabled) return;
    answersDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    Array.from(answerContainer.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");

        } else if (button === selectedButton) {
            button.classList.add("incorrect");
        }
    });
    if (isCorrect) {
        score++;
        scoreSpan.textContent = score;

    }
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestion.length) {
            showQuestion();
        } else {
            showResults();
        }

    }, 1000);
}
function showResults() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");
    finalScoreSpan.textContent = score;

    const percentage = (score / quizQuestion.length) * 100;

    if (percentage === 100) {
        resultMessage.textContent = "Perfect! You'r a genius!"
    } else if (percentage >= 80) {
        resultMessage.textContent = "Great Job! You know your stuff!"
    } else if (percentage >= 60) {
        resultMessage.textContent = "Good effort! Keep Learning!"

    } else if (percentage >= 40) {
        resultMessage.textContent = "Not bad! Try again to improve!"
    } else {
        resultMessage.textContent = "Keep studying! You'll get better!"
    }
}
function restartQuiz() {
    resultScreen.classList.remove('active');
    startQuiz();
}

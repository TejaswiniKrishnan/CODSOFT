const quizData = [
    {
        question: "Who is most often credited with inventing electricity?",
        options: ["Albert Einstein", "Benjamin Franklin", "Marie Curie", "Isaac Newton"],
        answer: "Benjamin Franklin"
    },
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: "Paris"
    },
    {
        question: "What language contains the most words?",
        options: ["English", "French", "Tamil", "Korean"],
        answer: "English"
    },
    {
        question: "Who is the CEO of Tesla?",
        options: ["Jeff Bezos", "Elon Musk", "Bill Gates", "Tony Stark"],
        answer: "Elon Musk"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        answer: "Pacific Ocean"
    }
];

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    optionsElement.innerHTML = '';

    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => selectAnswer(button, option));
        const li = document.createElement('li');
        li.appendChild(button);
        optionsElement.appendChild(li);
    });
}

function selectAnswer(button, selectedOption) {
    const currentQuestion = quizData[currentQuestionIndex];
    const optionsElement = document.getElementById('options');
    const buttons = optionsElement.querySelectorAll('button');

    if (selectedOption === currentQuestion.answer) {
        button.classList.add('correct');
        score++;
    } else {
        button.classList.add('incorrect');
        buttons.forEach(btn => {
            if (btn.textContent === currentQuestion.answer) {
                btn.classList.add('correct');
            }
        });
    }

    buttons.forEach(btn => btn.disabled = true);

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            showScore();
        }
    }, 1000);
}

function showScore() {
    const quizContainer = document.getElementById('quiz-container');
    const scoreContainer = document.getElementById('score-container');

    quizContainer.style.display = 'none';
    scoreContainer.style.display = 'block';
    scoreContainer.textContent = `Your score: ${score} / ${quizData.length}`;
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

window.onload = loadQuestion;

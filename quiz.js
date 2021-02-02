// code was taken from https://youtu.be/f4fB9Xg2JEY


const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: 'What is Covid-19?',
        choice1: 'Bacteria',
        choice2: 'Virus',
        choice3: 'Cell',
        choice4: 'Device',
        answer: '2',
    },
    {
        question: 'In what year did we find out about Covid-19?',
        choice1: '2009',
        choice2: '2016',
        choice3: '2021',
        choice4: '2019',
        answer: '4',
    },
    {
        question: 'How does Covid-19 spread?',
        choice1: 'Through direct contant with a bear',
        choice2: 'Through droplets of saliva from an infected person',
        choice3: 'By washing your hands regularly',
        choice4: 'By staying at home',
        answer: '2',
    },
    {
        question: 'What should you do if you feel unwell?',
        choice1: 'See a doctor immediately',
        choice2: 'Go out with your friends',
        choice3: 'Not wear a mask when going out',
        choice4: 'Do some exercise',
        answer: '1',
    },
]

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

startGame = () =>{
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}
getNewQuestion = () => {
    if(availableQuestions.Length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score);

        return window.location.assign('/end.html');
    }

    questionCounter ++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice ' + number ];
    });

    availableQuestions.splice(questionsIndex, 1);

    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'
        if (classToApply === 'correct'){
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()
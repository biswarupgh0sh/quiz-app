const questions = [
    {
        question: "What is the largest animal?",
        answers: [
            {text: "Shark", isCorrect: false},
            {text: "Blue Whale", isCorrect: true},
            {text: "Elephant", isCorrect: false},
            {text: "Giraffe", isCorrect: false}
        ]
    },
    {
        question: "What is the smallest country?",
        answers: [
            {text: "Vatican city", isCorrect: true},
            {text: "Bhutan", isCorrect: false},
            {text: "Nepal", isCorrect: false},
            {text: "Russia", isCorrect: false}
        ]
    },
    {
        question: "What is the largest desert?",
        answers: [
            {text: "Kalahhari", isCorrect: false},
            {text: "Gobi", isCorrect: false},
            {text: "Sahara", isCorrect: false},
            {text: "Antarctica", isCorrect: true}
        ]
    },
    {
        question: "What is the smallest continent?",
        answers: [
            {text: "Asia", isCorrect: false},
            {text: "Oceania", isCorrect: true},
            {text: "Europe", isCorrect: false},
            {text: "Africa", isCorrect: false}
        ]
    }
]

const questionEmt = document.querySelector(".question");
const answerBtn = document.querySelector(".answersBtn");
const nextBtn = document.querySelector(".nextBtn");

let currentQsIndex = 0;
let score = 0;

startQuiz();

function startQuiz(){
    currentQsIndex = 0;
    score = 0;
    nextBtn.textContent = "Next";
    showQs();
}

function showQs() {
    resetThis();
    let currentQs = questions[currentQsIndex];
    let qsNo = currentQsIndex + 1;
    questionEmt.textContent = `${qsNo}. ${currentQs.question}`;
    
    currentQs.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("ans");
        answerBtn.appendChild(button);
        if(answer.isCorrect){
            button.dataset.isCorrect = answer.isCorrect;
        }
        button.addEventListener("click", selectAns)
    });
}
function selectAns(e){
    const selectedBtn = e.target;
    const ifCorrectOrnot = selectedBtn.dataset.isCorrect === "true";
    if(ifCorrectOrnot){
        selectedBtn.classList.add("correct");
        score++;
    }else {
        selectedBtn.classList.add("notCorrect");
    }
    Array.from(answerBtn.children).forEach(num => {
        if(num.dataset.isCorrect === "true"){
            num.classList.add("correct");
        }
        num.disabled = true;
    }); 
    nextBtn.style.display = "block";
}
function resetThis(){
    nextBtn.style.display = "none";
    while(answerBtn.firstChild){
        answerBtn.removeChild(answerBtn.firstChild);
    }
}
function showScore(){
    resetThis();
    questionEmt.textContent = `You scored ${score} out of ${questions.length}`
    nextBtn.textContent = "Play again!";
    nextBtn.style.display = "block";
}

function handleNextBtn(){
    currentQsIndex++;
    if(currentQsIndex < questions.length){
        showQs();
    }else{
        showScore();
    }
}

nextBtn.addEventListener("click", () => {
    if(currentQsIndex<questions.length){
        handleNextBtn();
    }else {
        startQuiz();
    }
});
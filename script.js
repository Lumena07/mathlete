document.addEventListener("DOMContentLoaded", function () {
    const questionElement = document.getElementById("question");
    const answerElement = document.getElementById("answer");
    const submitButton = document.getElementById("submit");
    const resultElement = document.getElementById("result");
    const startAgainButton = document.getElementById("start-again");

    startAgainButton.style.display = "none";
    startAgainButton.addEventListener("click", startGame);

    let score = 0;
    let startTime = null;
    let totalQuestions = 0;
    let currentQuestion = generateQuestion();

    function generateQuestion() {
        totalQuestions++; 
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const operator = ["+", "-", "*"][Math.floor(Math.random() * 3)];
        const question = `${num1} ${operator} ${num2}`;
        
        let answer;
        switch (operator) {
            case "+":
                answer = num1 + num2;
                break;
            case "-":
                answer = num1 - num2;
                break;
            case "*":
                answer = num1 * num2;
                break;
        }
        return { question, answer };
    }

    function startGame() {
        score = 0;
        startTime = new Date().getTime();
        submitButton.disabled = false;
        startAgainButton.disabled = true;
        startAgainButton.style.display = "none";
        displayCurrentQuestion();
    }

    function handleAnswerSubmission() {
        const userAnswer = parseInt(answerElement.value);
        const { answer } = currentQuestion;

        if (userAnswer === answer) {
            resultElement.textContent = "Correct!";
            score++;
        } else {
            resultElement.textContent = `Wrong. The correct answer is ${answer}`;
        }

        answerElement.value = "";
        setTimeout(nextQuestion, 200);
    }

    function displayCurrentQuestion() {
        currentQuestion = generateQuestion();
        questionElement.textContent = `Question: ${currentQuestion.question}`;
        resultElement.textContent = "";
    }

    function nextQuestion() {
        displayCurrentQuestion();
    }

    function endGame() {
        const answeredCorrectly = score;
        resultElement.textContent = `You answered ${answeredCorrectly} questions correctly out of ${totalQuestions} total questions in 60 seconds.`;
        submitButton.disabled = true;
        startAgainButton.style.display = "block";
        startAgainButton.disabled = false;
    }

    startGame();
    submitButton.addEventListener("click", handleAnswerSubmission);
    setTimeout(endGame, 60000);
});

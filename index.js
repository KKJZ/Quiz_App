//question number global
let questionNumber = 0; 

//reset questionNumber
function resetQuestionNumber () {
  questionNumber = 0;
  $('.question-number').text(questionNumber);
}

//move the question-number span class up one
function updateQuestionNumber () {
  $('.question-number').text(questionNumber + 1);
}

//score global
let score = 0;

//adding to the score span class
function updateScore () {
  score++;
  $('.score').text(score);
}

//reset score
function restScore () {
  score = 0;
  $('.score').text(score);
}

//render questions on screen
function renderQuestions () {
  console.log(`Next Question, #${questionNumber + 1} Render question screen.`);
  updateQuestionNumber();
  //generate the string we need to Display
  const questionString = getQuestionString();
  $('main').html(questionString);

}

//figure out what question we need 
function getQuestionString () {
  const question =  getQuestion (questions, questionNumber);
  return `
        <form id='quesiton-form'>
        <fieldset class="grey-box">
          <span class="question">${question.question}</span>

          <label for="answer1">
            <input type="radio" id="answer1" class="answerOption" name="answerOption" value="${question.answers[0]}" required>${question.answers[0]}
          </label>

          <label for="answer2">
            <input type="radio" id="answer2" class="answerOption" name="answerOption" value="${question.answers[1]}" required>${question.answers[1]}
          </label>

          <label for="answer3">
            <input type="radio" id="answer3" class="answerOption" name="answerOption" value="${question.answers[2]}" required>${question.answers[2]}
          </label>

          <label for="answer4">
            <input type="radio" id="answer4" class="answerOption" name="answerOption" value="${question.answers[3]}" required>${question.answers[3]}
          </label>
          <button type="submit">Submit</button>
        </fieldset>
      </form>
  `

}

//handle #question-form submit
function handleFormSubmit () {
  $('main').submit(event => {
    event.preventDefault();
    let selected = $('input:checked');
    let answer = selected.val();
    let correct = `${questions[questionNumber].correctAnswer}`
    checkAnswer(answer, correct);
  })

}

//Check if answer is correct
function checkAnswer (answer, correct) {
  console.log('Checking answer');
  if ( answer == correct) {
    emptyMain();
    renderCorrect();
  }
  else {
    emptyMain();
    renderWrong(correct);

  }
}

//get question form itemIndex number
function getQuestion (items, itemIndex) {
  //if it is the last item end quiz
  if (itemIndex === items.length) {
    renderEnd();
  }
  // if not last item in quiz return obj in itemIndex
  else {
    return (items[itemIndex]);
  }
}

//render correct screen
function renderCorrect () {
  console.log(`Add Point to score.`);
  updateScore();  
  console.log(`Correct, Render correct screen.`);
  const correctString = `
      <div class="row">
        <div class="col-12 answer">
          <h1>Correct!!</h1>
          <img class="image" src="https://media.giphy.com/media/3o6Zt6vBVGGxXGCvKg/giphy.gif" alt="Right">
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <button class="next-question">Next Question</button></div>
      </div>
  `;
  $('main').html(correctString);
}

//render wrong screen
function renderWrong (correct) {
  console.log(`Wrong, Render wrong screen.`);
  console.log(correct);
  const wrongString = `
      <div class="row">
        <div class="col-12 answer">
          <h1>Wrong!! It was ${correct}.</h1>
          <img class="image" src="https://media.giphy.com/media/xT8qB4nGwmMTOrulig/giphy.gif" alt="Wrong">
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <button class="next-question">Next Question</button></div>
      </div>`;
  $('main').html(wrongString);
}

//handle next-question
function handleNextQuestion () {
  $('main').on('click', '.next-question', event =>{
    questionNumber++;
    emptyMain();
    renderQuestions();
  })

}

//render end screen
function renderEnd (){
  console.log(`Last Question, Display results screen.`);
  questionNumber = 0;
  const endStringBad = `
  <div class="row">
        <div class="col-12 answer">
          <h1>Finished!!!</h1>
          <h2>Your score:${score}</h2>
          <img class="image" src="https://media.giphy.com/media/xT8qB0ArZJb2mJENLa/giphy.gif" alt="Try again">
        </div>
      </div>

        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <button class="restart-quiz">Restart Quiz</button></div>
      </div>`;
  const endStringGood = `
        <div class="row">
        <div class="col-12 answer">
          <h1>Finished!!!</h1>
          <h2>Your score:${score}</h2>
          <img class="image" src="https://media.giphy.com/media/xUA7aMykjYhQAMBlV6/giphy.gif" alt="Congrats!!">
        </div>
      </div>

        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <button class="restart-quiz">Restart Quiz</button></div>
      </div>`

  resetQuestionNumber();
  if (score <= 5) {
    $('main').html(endStringBad);
  }
  else {
     $('main').html(endStringGood)
  };
  
}

//restart
function restartQuiz () {
  console.log(`Restarting Quiz.`);
  restScore();
  renderQuestions();
}

//handle restart-quiz
function handleRestartQuiz () {
  $('main').on('click', '.restart-quiz', event => {
    restartQuiz();
  })
}

//handle start-quiz
function handleStartQuiz () {
  console.log(`Starting Quiz.`)
  $('main').on('click', '.start-quiz', event => {
    emptyMain();
    renderQuestions();
  })
}

//clear main
function emptyMain () {
  $('main').empty();
}

//Start function
function onStart() {
  handleFormSubmit();
  handleStartQuiz();
  handleNextQuestion();
  handleRestartQuiz();
}

onStart();
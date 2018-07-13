
var trivia = {
    initialScreen: "",
    correctCounter: 0,
    inCorrectCounter: 0,
    unAnsweredCounter: 0,
    clickSound: new Audio("assets/sounds/button-09.mp3"),
    gameHTML: "",
    questionsArray: [
                    "In what year did Led Zeppelin release their first album?", "Which guitar is considered as the Holy Grail of all guitars?", "In what year did the drummer of Led Zeppelin, John Bonham, pass away?", "How many studio albums did Led Zeppelin release in their span of 12 years as a band?", "What is the name the longest song by Led Zeppelin from their studio recordings?"],
    answerArray: [
                  ["1965", "1970", "1968", "1969"], ["1964 Fender Telecaster", " 1955 Fender Stratocaster", "1959 Gibson Les Paul", "1964 Gibson Es-345"], ["1979", "1982", "1977", "1980"], ["8", "9", "7", "10"], ["Stairway to Heaven", "In My Time of Dying", "When the Levee Breaks", "Kashmir"],],
    correctAnswers: [
                    "C. 1968", "C. 1959 Gibson Les Paul", "D. 1980", "B. 9", "B. In My Time of Dying"],
    imageArray: [
                "<img class='center-block img-right' src='assets/images/LZ1.png'>", "<img class='center-block img-right' src='assets/images/guitar.jpg'>", "<img class='center-block img-right' src='assets/images/bonham.jpg'>", "<img class='center-block img-right' src='assets/images/albums.jpg'>", "<img class='center-block img-right' src='assets/images/inmytime.jpg'>"],
    clock: "",
    questionCounter: 0,
    timeCounter: 20,
  };
  
  

  function startScreen(){

    trivia.initialScreen = "<p class='text-center main-button'><a class='btn btn-primary btn-lg start-button text-center' href='#'>Start!</a></p>";

    $(".main-area").html(trivia.initialScreen);
  };
  
  function timer(){
    trivia.clock = setInterval(twentySeconds, 1000);
    function twentySeconds(){
      if(trivia.timeCounter === 0){
        timeOutLoss();
        clearInterval(trivia.clock);
      }
      if(trivia.timeCounter > 0) {
        trivia.timeCounter --;
      }
      $(".timer").html(trivia.timeCounter);
    }
  };
  
  function wait(){
    if(trivia.questionCounter < 4) {
      trivia.questionCounter ++;
      generateHTML();
      trivia.timeCounter = 20;
      timer();
    }
    else {
      finalScreen();
    }
  };
  
  function win(){
    trivia.correctCounter ++;
    trivia.gameHTML = "<p class='text-center'> Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + trivia.correctAnswers[trivia.questionCounter] + "</p>" + trivia.imageArray[trivia.questionCounter];
    $(".main-area").html(trivia.gameHTML);
    setTimeout(wait, 4000);
  };
  
  function loss(){
    trivia.inCorrectCounter ++;
    trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ trivia.correctAnswers[trivia.questionCounter] + "</p>" + trivia.imageArray[trivia.questionCounter];
      $(".main-area").html(trivia.gameHTML);
      setTimeout(wait, 4000);
  };
  
  function timeOutLoss(){
    trivia.unAnsweredCounter ++;
    trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + trivia.correctAnswers[trivia.questionCounter] + "</p>" + trivia.imageArray[trivia.questionCounter];
      $(".main-area").html(trivia.gameHTML);
      setTimeout(wait, 4000);
  };
  
  function finalScreen(){
    trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + trivia.correctCounter + "</p>" + "<p class='summary-correct2'>Wrong Answers: " + trivia.inCorrectCounter + "</p>" + "<p class='summary-correct3'>Unanswered: " + trivia.unAnsweredCounter + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
    $(".main-area").html(trivia.gameHTML);
  };
  
  function resetGame(){
    trivia.questionCounter = 0;
    trivia.correctCounter = 0;
    trivia.inCorrectCounter = 0;
    trivia.unAnsweredCounter = 0;
    trivia.timeCounter = 20;
    generateHTML();
    timer();
  };
  
  function generateHTML(){
    trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>20</span></p><p class='text-center'>" + trivia.questionsArray[trivia.questionCounter] + "</p><button class='first-answer answer'>A. " + trivia.answerArray[trivia.questionCounter][0] + "</button><br><button class='answer'>B. "+trivia.answerArray[trivia.questionCounter][1]+"</button><br><button class='answer'>C. "+trivia.answerArray[trivia.questionCounter][2]+"</button><br><button class='answer'>D. "+trivia.answerArray[trivia.questionCounter][3]+"</button>";
    $(".main-area").html(trivia.gameHTML);
  }
  

  startScreen();

  $("body").on("click", ".start-button", function(event){
      event.preventDefault();
      trivia.clickSound.play();
      generateHTML();
  
      timer();
  });
  
  $("body").on("click", ".answer", function(event){
      trivia.clickSound.play();
   
    selectedAnswer = $(this).text();
      if(selectedAnswer === trivia.correctAnswers[trivia.questionCounter]) {
  
          clearInterval(trivia.clock);
          win();
      }

      else {
  
          clearInterval(trivia.clock);
          loss();
      }
  }); 
  
 
  $("body").on("click", ".reset-button", function(event){
      trivia.clickSound.play();
      resetGame();
  }); 